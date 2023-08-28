import { Op, col } from 'sequelize';
import { Program, IProgramDA, ProgramQuery } from '../model/program/';
import { ProgramInterface } from '../sequelize';
import buildSequelizeQuery from './querybuilder';
import { errors } from '../model';

export default class ProgramDataAccess implements IProgramDA {
    constructor() {}

    async insert(program: Program): Promise<Program> {
        const createdProgram = await ProgramInterface.create({
            name: program.name as string,
            endDate: program.endDate as Date,
        });

        return {
            id: createdProgram.id,
            name: createdProgram.name,
            endDate: createdProgram.endDate,
        };
    }

    async read(query: Program): Promise<Program[]> {
        console.log('ProgramQuery:', query);
        const statement = buildSequelizeQuery(query);
        console.log(statement);
        return ProgramInterface.findAll({ order: col('id'), ...statement });
    }

    async update(program: Program): Promise<Program> {
        const retrievedProgram = await ProgramInterface.findByPk(program.id);

        if (!retrievedProgram) {
            throw errors.makeBadRequest('given id does not exist');
        }

        retrievedProgram.name = program?.name ?? (program.name as string);
        retrievedProgram.endDate = program?.endDate ?? (program.endDate as Date);

        await retrievedProgram.save({ omitNull: true });

        return {
            id: retrievedProgram.id,
            name: retrievedProgram.name,
            endDate: retrievedProgram.endDate,
        };
    }

    async delete(ids: number[]): Promise<void> {
        const programs = await ProgramInterface.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });

        programs.forEach((program) => {
            program.destroy();
        });
    }
}
