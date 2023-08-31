import { Op, ValidationError, col } from 'sequelize';
import { Exercise, IExerciseDA, Query, errors } from '../model';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';
import { ExerciseResult } from '../model/exercise/exercise';

export default class ExerciseDataAccess implements IExerciseDA {
    constructor() {}

    async insert(fields: Exercise): Promise<ExerciseResult> {
        const transaction = await db.transaction();
        try {
            const exercise = await db.Exercise.create(
                {
                    name: fields.name!,
                },
                { transaction: transaction }
            );

            const muscles = await db.Muscle.findAll({
                where: {
                    id: fields.muscleIds!,
                },
            });

            await exercise.addMuscles(muscles, { transaction: transaction });
            await transaction.commit();

            return await exercise.reload({
                include: db.associations.exerciseHasManyMuscle,
            });
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async read(queries: Query[]): Promise<ExerciseResult[]> {
        const statement = buildSequelizeQuery(queries);
        const exercises = await db.Exercise.findAll({
            order: col('id'),
            ...statement,
            include: db.associations.exerciseHasManyMuscle,
        });

        return exercises;
    }

    async update(fields: Exercise): Promise<ExerciseResult> {
        const transaction = await db.transaction();
        try {
            const exercise = await db.Exercise.findByPk(fields.id, {
                include: db.associations.exerciseHasManyMuscle,
                transaction: transaction,
            });

            if (!exercise) {
                throw errors.makeBadRequest('given id does not exist');
            }

            exercise.name = fields.name ?? exercise.name;

            if (fields.muscleIds && fields.muscleIds.length > 0) {
                const muscles = await db.Muscle.findAll({
                    where: { id: fields.muscleIds },
                });

                await exercise.setMuscles(muscles, { transaction: transaction });
            }

            const updatedExercise = await exercise.save({
                omitNull: true,
                transaction: transaction,
            });
            await transaction.commit();

            return await updatedExercise.reload({
                include: db.associations.exerciseHasManyMuscle,
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
        await db.Exercise.destroy(statement);
    }
}
