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
        return await db.Program.findAll({
            order: col('id'),
            ...statement,
            include: { all: true, nested: true },
        });
    }

    async update(program: Program): Promise<Program> {
        const retrievedProgram = await db.Program.findByPk(program.id);

        if (!retrievedProgram) {
            throw errors.makeBadRequest('given id does not exist');
        }

        retrievedProgram.name = program.name ?? retrievedProgram.name;
        retrievedProgram.endDate = program.endDate ?? retrievedProgram.endDate;

        const updatedSet = await retrievedProgram.save({ omitNull: true });

        return updatedSet.reload({ include: { all: true, nested: true } });
    }

    async delete(queries: Query[]): Promise<void> {
        const statement = buildSequelizeQuery(queries);
        const programs = await db.Program.findAll(statement);

        programs.forEach((program) => {
            program.destroy();
        });
    }
}
