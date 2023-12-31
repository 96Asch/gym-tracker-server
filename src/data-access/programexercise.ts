import { ValidationError } from 'sequelize';
import { Query, errors } from '../model';
import {
    IProgramExerciseDA,
    ProgramExercise,
    ProgramExerciseResult,
} from '../model/programexercise';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';
import { stat } from 'fs';

export default class ProgramExerciseDataAccess implements IProgramExerciseDA {
    constructor() {}

    async insert(fields: ProgramExercise[]): Promise<ProgramExerciseResult[]> {
        const transaction = await db.transaction();
        try {
            const programExercises = await db.ProgramExercise.bulkCreate(
                fields.map((pe) => {
                    return {
                        order: pe.order!,
                    };
                }),
                { transaction: transaction }
            );

            for (let index = 0; index < fields.length; index++) {
                const exercise = await db.Exercise.findByPk(fields[index].exerciseId, {
                    transaction: transaction,
                });

                if (!exercise) {
                    throw errors.makeBadRequest('given exerciseId does not exist');
                }

                await programExercises[index].setExercise(exercise, {
                    transaction: transaction,
                });

                const program = await db.Program.findByPk(fields[index].programId);
                if (!program) {
                    throw errors.makeBadRequest('given exerciseId does not exist');
                }

                await programExercises[index].setProgram(program, {
                    transaction: transaction,
                });
            }

            await transaction.commit();

            const reloadedProgramexercises = [];

            for (let index = 0; index < programExercises.length; index++) {
                const reloadedProgramExercise = await programExercises[index].reload({
                    include: [
                        { model: db.Exercise, include: [db.Muscle] },
                        { model: db.Set },
                    ],
                    order: [[db.Set, 'createdAt']],
                });

                reloadedProgramexercises.push(reloadedProgramExercise.dataValues);
            }

            return reloadedProgramexercises;
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeBadRequest(error.errors.join(','));
            }

            throw error;
        }
    }

    async read(queries: Query[]): Promise<ProgramExerciseResult[]> {
        const statement = buildSequelizeQuery(queries);
        return await db.ProgramExercise.findAll({
            ...statement,
            include: [{ model: db.Exercise, include: [db.Muscle] }, { model: db.Set }],
            order: [[db.Set, 'createdAt']],
        });
    }

    async update(fields: ProgramExercise): Promise<ProgramExerciseResult> {
        const transaction = await db.transaction();
        try {
            const programExercise = await db.ProgramExercise.findByPk(fields.id);

            if (!programExercise) {
                throw errors.makeBadRequest('given id does not exist');
            }

            if (fields.exerciseId && fields.exerciseId != 0) {
                const exercise = await db.Exercise.findByPk(fields.exerciseId);

                if (!exercise) {
                    throw errors.makeBadRequest('given exerciseId does not exist');
                }

                await programExercise.setExercise(exercise, { transaction: transaction });
            }

            if (fields.programId && fields.programId != 0) {
                const program = await db.Program.findByPk(fields.programId);

                if (!program) {
                    throw errors.makeBadRequest('given programId does not exist');
                }

                await programExercise.setProgram(program, { transaction: transaction });
            }

            programExercise.order = fields.order ?? programExercise.order;

            const savedProgramExercise = await programExercise.save({
                omitNull: true,
                transaction: transaction,
            });

            await transaction.commit();
            return await savedProgramExercise.reload({
                include: [
                    { model: db.Exercise, include: [db.Muscle] },
                    { model: db.Set },
                ],
                order: [[db.Set, 'createdAt']],
            });
        } catch (error) {
            transaction.rollback();
            if (error instanceof ValidationError) {
                throw errors.makeBadRequest(error.message);
            }
            throw error;
        }
    }

    async delete(queries: Query[]): Promise<void> {
        const statement = buildSequelizeQuery(queries);
        await db.ProgramExercise.destroy(statement);
    }
}
