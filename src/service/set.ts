import type { ISetDA, ISetService, Set, SetQuery } from '../model';
import { errors, Query, queryBuilder } from '../model';
import { SetResult } from '../model/set/set';
import makeNumberedQuery from './idquery';

export default class SetService implements ISetService {
    constructor(private readonly setDA: ISetDA) {}

    async insert(set: Set): Promise<SetResult> {
        if (set.weightInKg < 0) {
            throw errors.makeBadRequest('weightInKg cannot be negative');
        }

        if (set.repetitions < 0) {
            throw errors.makeBadRequest('repetitions cannot be negative');
        }

        return await this.setDA.insert(set);
    }

    async read(query: SetQuery): Promise<SetResult[]> {
        const queries: Query[] = [];

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        if (query.exerciseIds) {
            queries.push(makeNumberedQuery('exerciseId', query.exerciseIds));
        }

        if (query.programIds) {
            queries.push(makeNumberedQuery('programId', query.programIds));
        }

        if (query.weightInKg) {
            queries.push(makeNumberedQuery('weightInKg', query.weightInKg));
        }

        if (query.repetitions) {
            queries.push(makeNumberedQuery('repetitions', query.repetitions));
        }

        if (query.double) {
            queries.push(queryBuilder.makeSingle('double', query.double, 'EQ'));
        }

        return await this.setDA.read(queries);
    }

    async update(set: Set): Promise<SetResult> {
        throw new Error('Method not implemented.');
    }

    async delete(query: SetQuery): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
