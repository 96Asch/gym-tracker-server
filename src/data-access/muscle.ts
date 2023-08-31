import { ValidationError, col } from 'sequelize';
import { IMuscleDA, Muscle, Query, errors } from '../model';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';

export default class MuscleDataAccess implements IMuscleDA {
    constructor() {}

    async insert(fields: Muscle): Promise<Muscle> {
        const transaction = await db.transaction();
        try {
            const muscle = await db.Muscle.create(
                {
                    name: fields.name,
                },
                { transaction: transaction }
            );
            await transaction.commit();

            return muscle;
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async read(queries: Query[]): Promise<Muscle[]> {
        const statement = buildSequelizeQuery(queries);
        return await db.Muscle.findAll({ order: col('id'), ...statement });
    }

    async update(fields: Muscle): Promise<Muscle> {
        const transaction = await db.transaction();
        try {
            const muscle = await db.Muscle.findByPk(fields.id, {
                transaction: transaction,
            });

            if (!muscle) {
                throw errors.makeBadRequest(`record with id ${fields.id} does not exist`);
            }

            if (fields.name != '') {
                muscle.name = fields.name;
            }

            const updatedMuscle = await muscle.save({
                omitNull: true,
                transaction: transaction,
            });
            await transaction.commit();

            return await updatedMuscle.reload({ include: { all: true, nested: true } });
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
        const muscles = await db.Muscle.findAll(statement);
        muscles.forEach((muscle) => {
            muscle.destroy();
        });
    }
}
