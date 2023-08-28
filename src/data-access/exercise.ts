import { Op, ValidationError, col } from 'sequelize';
import { Exercise, ExerciseQuery, IExerciseDA, errors } from '../model';
import { ExerciseInterface } from '../sequelize';
import type { BaseError } from 'sequelize';
import buildSequelizeQuery from './querybuilder';

export default class ExerciseDataAccess implements IExerciseDA {
    constructor(private readonly filterKeys: string[]) {}

    async insert(fields: Exercise): Promise<Exercise> {
        try {
            const exercise = await ExerciseInterface.create({
                name: fields.name as string,
                target: fields.target as string,
            });

            return {
                id: exercise.id,
                name: exercise.name,
                target: exercise.target,
            };
        } catch (error) {
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
        }

        return { name: '', target: '' };
    }

    async read(query: Exercise): Promise<Exercise[]> {
        const statement = buildSequelizeQuery(query);
        console.log(statement);
        return await ExerciseInterface.findAll({ order: col('id'), ...statement });
    }

    async update(fields: Exercise): Promise<Exercise> {
        const exercise = await ExerciseInterface.findByPk(fields.id);

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
        const exercises = await ExerciseInterface.findAll({
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
