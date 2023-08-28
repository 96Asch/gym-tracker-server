import { ProgramQuery, errors } from '../model';
import error from '../model/error';
import { Program } from '../model/program/program';
import { IProgramDA } from '../model/program/program.data-access';
import { IProgramService } from '../model/program/program.service';
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
        query.before = query?.before?.trim();
        query.ids = query?.ids?.trim();

        if (query.before && Number.isNaN(Date.parse(query.before))) {
            throw errors.makeBadRequest('query [before] must be a valid date');
        }

        if (query.ids) {
            const ids = query.ids.split(',');
            const nans = ids.filter((id: string) => {
                return Number.isNaN(parseInt(id));
            });

            if (nans.length > 0) {
                throw errors.makeBadRequest(`query [ids] non-numbers: [${nans}]`);
            }
        }

        const programs = await this.programDA.read({
            id: query.ids,
            endDate: query.before ? new Date(query.before as string) : undefined,
        });
        return programs;
    }

    async update(program: Program): Promise<Program> {
        throw new Error('Method not implemented.');
    }

    async delete(ids: number[]): Promise<Program> {
        throw new Error('Method not implemented.');
    }
}
