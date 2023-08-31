import { errors, queryBuilder } from '../model';
import type {} from '../model';
import error from '../model/error';
import type {
    Program,
    IProgramDA,
    IProgramService,
    ProgramQuery,
    Query,
} from '../model/';
import { formatDate } from '../util';
import makeNumberedQuery from './idquery';

export default class ProgramService implements IProgramService {
    constructor(private readonly programDA: IProgramDA) {}

    async insert(fields: Program): Promise<Program> {
        if (fields.endDate && fields.endDate.getTime() <= Date.now()) {
            throw error.makeBadRequest(
                `endDate cannot be earlier or equal to ${formatDate(new Date())} `
            );
        }

        const createdProgram = await this.programDA.insert(fields);
        return createdProgram;
    }

    async read(query: ProgramQuery): Promise<Program[]> {
        const queries = this.setQueryToQueries(query);

        if (query.nested && query.nested == 'all') {
            queries.push(queryBuilder.makeNested());
        }

        return await this.programDA.read(queries);
    }

    async update(fields: Program): Promise<Program> {
        if (fields.endDate && fields.endDate.getTime() <= Date.now()) {
            throw error.makeBadRequest(
                `endDate cannot be earlier or equal to ${formatDate(new Date())} `
            );
        }

        fields.name = fields.name?.trim().toLowerCase();

        return await this.programDA.update(fields);
    }

    async delete(query: ProgramQuery): Promise<void> {
        const queries = this.setQueryToQueries(query);

        if (queries.length == 0) {
            return;
        }

        await this.programDA.delete(queries);
    }

    setQueryToQueries(query: ProgramQuery): Query[] {
        const queries: Query[] = [];

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        if (query.finished != null) {
            queries.push(queryBuilder.makeSingle('finished', query.finished, 'EQ'));
        }

        if (query.before) {
            const before = query.before.trim();

            if (Number.isNaN(Date.parse(before))) {
                throw errors.makeBadRequest('query [before] must be a valid date');
            }

            queries.push(queryBuilder.makeSingle('endDate', before, 'LessThanOrEqual'));
        }

        return queries;
    }
}
