import type { Query } from '../model';
import { Set, SetQuery, ISetDA, errors } from '../model/';
import { SetResult } from '../model/set/set';
import db from '../sequelize';
import { buildSequelizeQuery } from './querybuilder';

export class SetDataAccess implements ISetDA {
    constructor() {}

    async insert(set: Set): Promise<SetResult> {
        const createdSet = await db.Set.create(
            {
                repetitions: set.repetitions,
                weightInKg: set.weightInKg,
                double: set.double,
            },
            {
                returning: true,
            }
        );

        const exercise = await db.Exercise.findByPk(set.exerciseId);
        if (!exercise) {
            throw errors.makeBadRequest('given exerciseId does not exist');
        }

        const program = await db.Program.findByPk(set.exerciseId);
        if (!program) {
            throw errors.makeBadRequest('given programId does not exist');
        }

        createdSet.setExercise(exercise);
        createdSet.setProgram(program);

        return { ...createdSet.dataValues, program: program, exercise: exercise };
    }

    async read(queries: Query[]): Promise<SetResult[]> {
        const statement = buildSequelizeQuery(queries);
        return await db.Set.findAll({
            ...statement,
            include: [
                db.associations.setBelongsToExercise,
                db.associations.setBelongsToProgram,
            ],
        });
    }

    update(set: Set): Promise<SetResult> {
        throw new Error('Method not implemented.');
    }

    delete(query: SetQuery): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
