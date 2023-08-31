import type { ISetDA, ISetService, Set, SetQuery } from '../model';
import { errors, Query, queryBuilder } from '../model';
import { SetResult } from '../model/set/set';
import makeNumberedQuery from './idquery';

export default class SetService implements ISetService {
    constructor(private readonly setDA: ISetDA) {}

    async insert(set: Set): Promise<SetResult> {
        if (
            !set.programId ||
            !set.exerciseId ||
            !set.repetitions ||
            !set.weightInKg ||
            !set.double
        ) {
            throw errors.makeInternal(`fields of Set are null or undefined`);
        }

        if (set.weightInKg < 0) {
            throw errors.makeBadRequest('weightInKg cannot be negative');
        }

        if (set.repetitions! < 0) {
            throw errors.makeBadRequest('repetitions cannot be negative');
        }

        return await this.setDA.insert(set);
    }

    async read(query: SetQuery): Promise<SetResult[]> {
        const queries = this.setQueryToQueries(query);
        return await this.setDA.read(queries);
    }

    async update(fields: Set): Promise<SetResult> {
        if (!fields.id) {
            throw errors.makeInternal('id of Set cannot be undefined');
        }

        if (fields.exerciseId && fields.exerciseId <= 0) {
            throw errors.makeBadRequest('[exerciseId] cannot be empty or 0');
        }

        if (fields.programId && fields.programId <= 0) {
            throw errors.makeBadRequest('[programId] cannot be empty or 0');
        }

        if (fields.repetitions && fields.repetitions < 0) {
            throw errors.makeBadRequest('repetitions cannot be negative');
        }

        if (fields.weightInKg && fields.weightInKg < 0) {
            throw errors.makeBadRequest('weightInKg cannot be negative');
        }

        return await this.setDA.update(fields);
    }

    async delete(query: SetQuery): Promise<void> {
        const queries = this.setQueryToQueries(query);

        if (queries.length == 0) {
            return;
        }

        await this.setDA.delete(queries);
    }

    setQueryToQueries(query: SetQuery): Query[] {
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

        return queries;
    }
}
