import { ValidationError } from 'sequelize';
import type { Query } from '../model';
import { Set, SetQuery, ISetDA, errors } from '../model/';
import { SetResult } from '../model/set/set';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';

export class SetDataAccess implements ISetDA {
    constructor() {}

    async insert(set: Set): Promise<SetResult> {
        const createdSet = await db.Set.create(
            {
                repetitions: set.repetitions!,
                weightInKg: set.weightInKg!,
                double: set.double!,
            },
            {
                returning: true,
            }
        );

        const exercise = await db.Exercise.findByPk(set.exerciseId, {
            include: db.associations.exerciseHasManyMuscle,
        });
        if (!exercise) {
            throw errors.makeBadRequest('given exerciseId does not exist');
        }

        const program = await db.Program.findByPk(set.programId);
        if (!program) {
            throw errors.makeBadRequest('given programId does not exist');
        }

        createdSet.setExercise(exercise);
        createdSet.setProgram(program);

        return { ...createdSet.dataValues, program: program, exercise: exercise };
    }

    async read(queries: Query[]): Promise<SetResult[]> {
        const statement = buildSequelizeQuery(queries);
        return await db.Set.findAll({
            ...statement,
            include: { all: true, nested: true },
        });
    }

    async update(fields: Set): Promise<SetResult> {
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

            if (fields.shouldLog) {
                set.performedOn = new Date();
            }

            if (fields.exerciseId && fields.exerciseId != 0) {
                const exercise = await db.Exercise.findByPk(fields.exerciseId, {
                    include: db.associations.exerciseHasManyMuscle,
                });
                if (!exercise) {
                    throw errors.makeBadRequest('given exerciseId does not exist');
                }

                await set.setExercise(exercise);
            }

            if (fields.programId && fields.programId != 0) {
                const program = await db.Program.findByPk(fields.programId);
                if (!program) {
                    throw errors.makeBadRequest('given programId does not exist');
                }

                await set.setProgram(program);
            }

            const updatedSet = await set.save({ omitNull: true });
            return updatedSet.reload({
                include: { all: true, nested: true },
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async delete(queries: Query[]): Promise<void> {
        const statement = buildSequelizeQuery(queries);
        const sets = await db.Set.findAll(statement);

        sets.forEach((set) => {
            set.destroy();
        });
    }
}
