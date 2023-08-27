import error from '../model/error';
import { Program } from '../model/program/program';
import { IProgramDA } from '../model/program/program.data-access';
import { IProgramService } from '../model/program/program.service';
import { formatDate } from '../util';

export default class ProgramService implements IProgramService {
    constructor(private readonly programDA: IProgramDA) {}

    async insert(program: Program): Promise<Program> {
        if (program.endDate.getTime() <= Date.now()) {
            throw error.makeBadRequest(
                `endDate cannot be earlier or equal to ${formatDate(new Date())} `
            );
        }

        const createdProgram = await this.programDA.insert(program);
        return createdProgram;
    }
}
