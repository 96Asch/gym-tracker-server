import { Op, ValidationError, col } from 'sequelize';
import { Program, IProgramDA } from '../model/program/';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';
import { Query, errors } from '../model';
import { transaction } from '../sequelize/sequelize';

export default class ProgramDataAccess implements IProgramDA {
    constructor() {}

    async insert(program: Program): Promise<Program> {
        const transaction = await db.transaction();
        try {
            const createdProgram = await db.Program.create(
                {
                    name: program.name!,
                    endDate: program.endDate!,
                },
                { transaction: transaction }
            );

            const programExercises = await db.ProgramExercise.findAll({
                where: {
                    id: program.exerciseIds,
                },
                transaction: transaction,
            });

            if (programExercises) {
                await createdProgram.setProgramExercises(programExercises, {
                    transaction: transaction,
                });
            }
            await transaction.commit();

            return await createdProgram.reload({ include: db.ProgramExercise });
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async read(queries: Query[]): Promise<Program[]> {
        const statement = buildSequelizeQuery(queries);
        return await db.Program.findAll({
            order: col('endDate'),
            ...statement,
        });
    }

    async update(program: Program): Promise<Program> {
        const transaction = await db.transaction();
        try {
            const retrievedProgram = await db.Program.findByPk(program.id);

            if (!retrievedProgram) {
                throw errors.makeBadRequest('given id does not exist');
            }

            retrievedProgram.name = program.name ?? retrievedProgram.name;
            retrievedProgram.endDate = program.endDate ?? retrievedProgram.endDate;

            const programExercises = await db.ProgramExercise.findAll({
                where: {
                    id: program.exerciseIds,
                },
                transaction: transaction,
            });

            if (programExercises) {
                await retrievedProgram.setProgramExercises(programExercises, {
                    transaction: transaction,
                });
            }

            await transaction.commit();

            const updatedProgram = await retrievedProgram.save({
                omitNull: true,
                transaction: transaction,
            });

            return updatedProgram.reload({ include: db.ProgramExercise });
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeDuplicateError('exercise', ['name']);
            }
            throw error;
        }
    }

    async delete(queries: Query[]): Promise<void> {
        const statement = buildSequelizeQuery(queries);
        await db.Program.destroy(statement);
    }
}
