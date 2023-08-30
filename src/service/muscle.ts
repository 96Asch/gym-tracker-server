import {
    IMuscleDA,
    IMuscleService,
    Muscle,
    MuscleQuery,
    Query,
    queryBuilder,
} from '../model';
import makeNumberedQuery from './idquery';

export default class MuscleService implements IMuscleService {
    constructor(private readonly muscleDA: IMuscleDA) {}

    async insert(fields: Muscle): Promise<Muscle> {
        fields.name = fields.name.trim().toLowerCase();

        return this.muscleDA.insert(fields);
    }
    async read(query: MuscleQuery): Promise<Muscle[]> {
        const queries: Query[] = [];

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        if (query.name) {
            queries.push(
                queryBuilder.makeSingle(
                    'name',
                    query.name.trim().toLowerCase(),
                    'StartsWith'
                )
            );
        }

        return this.muscleDA.read(queries);
    }
    async update(program: Muscle): Promise<Muscle> {
        throw new Error('Method not implemented.');
    }
    async delete(ids: number[]): Promise<Muscle> {
        throw new Error('Method not implemented.');
    }
}
