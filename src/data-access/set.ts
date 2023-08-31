import { ValidationError } from 'sequelize';
import type { Query } from '../model';
import { Set, SetQuery, ISetDA, errors } from '../model/';
import { SetResult } from '../model/set/set';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';
import { transaction } from '../sequelize/sequelize';

export class SetDataAccess implements ISetDA {
    constructor() {}

    async insert(fields: Set): Promise<SetResult> {
        const transaction = await db.transaction();

        try {
            const set = await db.Set.create({
                repetitions: fields.repetitions!,
                weightInKg: fields.weightInKg!,
                double: fields.double!,
            });

            const programExercise = await db.ProgramExercise.findByPk(
                fields.programExerciseId
            );

            if (!programExercise) {
                throw errors.makeBadRequest('programExerciseId does not exist');
            }

            await programExercise.addSet(set, { transaction: transaction });
            await transaction.commit();

            return await set.reload({
                include: db.associations.setBelongsToProgramExercise,
            });
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeBadRequestVE(error);
            }
            throw error;
        }
    }

    async read(queries: Query[]): Promise<SetResult[]> {
        const statement = buildSequelizeQuery(queries);
        return await db.Set.findAll({
            ...statement,
            order: ['createdAt'],
        });
    }

    async update(fields: Set): Promise<SetResult> {
        const transaction = await db.transaction();
        try {
            const set = await db.Set.findByPk(fields.id, {
                include: db.associations.exerciseHasManyMuscle,
            });

            if (!set) {
                throw errors.makeBadRequest(`record with id ${fields.id} does not exist`);
            }

            set.repetitions = fields.repetitions ?? set.repetitions;
            set.weightInKg = fields.weightInKg ?? set.weightInKg;
            set.double = fields.double ?? set.double;

            if (fields.programExerciseId) {
                const programExercise = await db.ProgramExercise.findByPk(
                    fields.programExerciseId
                );

                if (!programExercise) {
                    throw errors.makeBadRequest('programExerciseId does not exist');
                }
                await programExercise.addSet(set, { transaction: transaction });
            }

            const updatedSet = await set.save({
                omitNull: true,
                transaction: transaction,
            });
            await transaction.commit();

            return updatedSet.reload({
                include: [db.associations.setBelongsToProgramExercise],
            });
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async delete(queries: Query[]): Promise<void> {
        const statement = buildSequelizeQuery(queries);
        await db.Set.destroy(statement);
    }
}
