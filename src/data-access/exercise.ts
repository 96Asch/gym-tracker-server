import { Op, ValidationError, col } from 'sequelize';
import { Exercise, IExerciseDA, Query, errors } from '../model';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';

export default class ExerciseDataAccess implements IExerciseDA {
    constructor() {}

    async insert(fields: Exercise): Promise<Exercise> {
        try {
            const exercise = await db.Exercise.create({
                name: fields.name as string,
                target: fields.target as string,
            });

            return exercise;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async read(queries: Query[]): Promise<Exercise[]> {
        const statement = buildSequelizeQuery(queries);
        console.log(statement);
        return await db.Exercise.findAll({ order: col('id'), ...statement });
    }

    async update(fields: Exercise): Promise<Exercise> {
        const exercise = await db.Exercise.findByPk(fields.id);

        if (!exercise) {
            throw errors.makeBadRequest('given id does not exist');
        }

        exercise.name = fields?.name ?? exercise.name;
        exercise.target = fields?.target ?? exercise.target;

        exercise.save({ omitNull: true });

        return {
            id: exercise.id,
            name: exercise.name,
            target: exercise.target,
        };
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
