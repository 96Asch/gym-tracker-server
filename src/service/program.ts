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

    async insert(program: Program): Promise<Program> {
        if (program.endDate && program.endDate.getTime() <= Date.now()) {
            throw error.makeBadRequest(
                `endDate cannot be earlier or equal to ${formatDate(new Date())} `
            );
        }

        const createdProgram = await this.programDA.insert(program);
        return createdProgram;
    }

    async read(query: ProgramQuery): Promise<Program[]> {
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

        const programs = await this.programDA.read(queries);
        return programs;
    }

    async update(program: Program): Promise<Program> {
        throw new Error('Method not implemented.');
    }

    async delete(ids: number[]): Promise<Program> {
        throw new Error('Method not implemented.');
    }
}
