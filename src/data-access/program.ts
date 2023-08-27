import { Program, IProgramDA } from '../model/program/';
import { ProgramInterface } from '../sequelize';

export default class ProgramDataAccess implements IProgramDA {
    constructor() {}

    async insert(program: Program): Promise<Program> {
        const createdProgram = await ProgramInterface.create({
            name: program.name,
            endDate: program.endDate,
        });

        return {
            id: createdProgram.id,
            name: createdProgram.name,
            endDate: createdProgram.endDate,
        };
    }
}
