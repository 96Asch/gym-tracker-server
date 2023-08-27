import { Op, ValidationError } from 'sequelize';
import { Exercise, ExerciseQuery, IExerciseDA, errors } from '../model';
import { ExerciseInterface } from '../sequelize';
import type { BaseError } from 'sequelize';

export default class ExerciseDataAccess implements IExerciseDA {
    constructor(private readonly filterKeys: string[]) {}

    async insert(fields: Exercise): Promise<Exercise> {
        try {
            const exercise = await ExerciseInterface.create({
                name: fields.name,
                target: fields.target,
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

    async read(query: ExerciseQuery): Promise<Exercise[]> {
        let statement: Object = {};
        let andClauses: Object = {};
        let filterUsed = false;

        Object.keys(query).forEach((key: string) => {
            const value = query[key as keyof typeof query];
            if (value) {
                filterUsed = true;
                let operator: Object = value;
                if (value.includes(',')) {
                    operator = {
                        [Op.in]: value.split(','),
                    };
                }

                andClauses = {
                    ...andClauses,
                    [key]: operator,
                };
            }
        });

        if (filterUsed) {
            statement = {
                where: {
                    ...andClauses,
                },
            };
        }

        console.log(statement);

        return await ExerciseInterface.findAll(statement);
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

    async delete(filterOptions: Map<string, string>): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
