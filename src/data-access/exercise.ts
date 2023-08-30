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
                name: fields.name,
            });

            const muscles = await db.Muscle.findAll({
                where: {
                    id: fields.muscleIds,
                },
            });

            exercise.addMuscles(muscles);
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
        console.log(statement);
        const exercises = await db.Exercise.findAll({
            order: col('id'),
            ...statement,
            include: db.associations.muscleBelongsToManyExercise,
        });

        return exercises;
    }

    async update(fields: Exercise): Promise<ExerciseResult> {
        const exercise = await db.Exercise.findByPk(fields.id);

        if (!exercise) {
            throw errors.makeBadRequest('given id does not exist');
        }

        exercise.name = fields?.name ?? exercise.name;

        const muscles = await db.Muscle.findAll({ where: { id: fields.muscleIds } });

        exercise.setMuscles(muscles);

        exercise.save({ omitNull: true });

        return exercise;
    }

    async delete(ids: number[]): Promise<void> {
        const exercises = await db.Exercise.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });

        exercises.forEach((exercise) => {
            exercise.destroy();
        });
    }
}
