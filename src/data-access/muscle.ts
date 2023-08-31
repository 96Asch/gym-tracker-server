import { ValidationError, col } from 'sequelize';
import { IMuscleDA, Muscle, Query, errors } from '../model';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';

export default class MuscleDataAccess implements IMuscleDA {
    constructor() {}

    async insert(fields: Muscle): Promise<Muscle> {
        try {
            const muscle = await db.Muscle.create({
                name: fields.name,
            });

            return muscle;
        } catch (error) {
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
        try {
            const muscle = await db.Muscle.findByPk(fields.id);

            if (!muscle) {
                throw errors.makeBadRequest(`record with id ${fields.id} does not exist`);
            }

            if (fields.name != '') {
                muscle.name = fields.name;
            }

            return await muscle.save({ omitNull: true });
        } catch (error) {
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
