import { Op, col } from 'sequelize';
import { Program, IProgramDA } from '../model/program/';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';
import { Query, errors } from '../model';

export default class ProgramDataAccess implements IProgramDA {
    constructor() {}

    async insert(program: Program): Promise<Program> {
        const createdProgram = await db.Program.create({
            name: program.name as string,
            endDate: program.endDate as Date,
        });

        return {
            id: createdProgram.id,
            name: createdProgram.name,
            endDate: createdProgram.endDate,
        };
    }

    async read(queries: Query[]): Promise<Program[]> {
        const statement = buildSequelizeQuery(queries);
        console.log(statement);
        return db.Program.findAll({ order: col('id'), ...statement });
    }

    async update(program: Program): Promise<Program> {
        const retrievedProgram = await db.Program.findByPk(program.id);

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
        const programs = await db.Program.findAll({
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
