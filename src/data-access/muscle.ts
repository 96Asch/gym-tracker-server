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

    async update(muscle: Muscle): Promise<Muscle> {
        throw new Error('Method not implemented.');
    }

    async delete(ids: number[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
