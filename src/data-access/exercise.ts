import { Op, ValidationError, col } from 'sequelize';
import { Exercise, IExerciseDA, Query, errors } from '../model';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';
import { ExerciseResult } from '../model/exercise/exercise';

export default class ExerciseDataAccess implements IExerciseDA {
    constructor() {}

    async insert(fields: Exercise): Promise<ExerciseResult> {
        try {
            const exercise = await db.Exercise.create({
                name: fields.name!,
            });

            const muscles = await db.Muscle.findAll({
                where: {
                    id: fields.muscleIds!,
                },
            });

            await exercise.addMuscles(muscles);
            return { ...exercise.dataValues, muscles: muscles };
        } catch (error) {
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
        const exercise = await db.Exercise.findByPk(fields.id, {
            include: db.associations.exerciseHasManyMuscle,
        });

        if (!exercise) {
            throw errors.makeBadRequest('given id does not exist');
        }

        exercise.name = fields.name ?? exercise.name;

        if (fields.muscleIds && fields.muscleIds.length > 0) {
            const muscles = await db.Muscle.findAll({ where: { id: fields.muscleIds } });

            await exercise.setMuscles(muscles);
        }

        const updatedExercise = await exercise.save({ omitNull: true });
        return await updatedExercise.reload({
            include: db.associations.exerciseHasManyMuscle,
        });
    }

    async delete(queries: Query[]): Promise<void> {
        const statement = buildSequelizeQuery(queries);
        const exercises = await db.Exercise.findAll(statement);

        exercises.forEach((exercise) => {
            exercise.destroy();
        });
    }
}
