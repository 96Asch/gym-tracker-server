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
            const ids = query.ids.trim();
            if (ids.includes('-')) {
                queries.push(queryBuilder.makeRange('id', ids, true));
            } else if (query.ids.includes(',')) {
                queries.push(queryBuilder.makeList('id', ids, true));
            } else {
                queries.push(queryBuilder.makeSingle('id', ids, 'EQ'));
            }
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
