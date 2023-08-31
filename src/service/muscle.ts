import {
    IMuscleDA,
    IMuscleService,
    Muscle,
    MuscleQuery,
    Query,
    QueryOperator,
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
        const queries = this.setQueryToQueries(query, 'StartsWith');
        return this.muscleDA.read(queries);
    }

    async update(fields: Muscle): Promise<Muscle> {
        fields.name = fields.name.trim().toLowerCase();

        return await this.muscleDA.update(fields);
    }

    async delete(query: MuscleQuery): Promise<void> {
        const queries = this.setQueryToQueries(query, 'EQ');

        if (queries.length == 0) {
            return;
        }

        await this.muscleDA.delete(queries);
    }

    setQueryToQueries(query: MuscleQuery, nameOperator: QueryOperator): Query[] {
        const queries: Query[] = [];

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        if (query.name) {
            queries.push(
                queryBuilder.makeSingle(
                    'name',
                    query.name.trim().toLowerCase(),
                    nameOperator
                )
            );
        }

        return queries;
    }
}
