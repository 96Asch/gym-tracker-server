import { Query, errors } from '../model';
import type {
    IProgramExerciseDA,
    IProgramExerciseService,
    ProgramExerciseBody,
    ProgramExerciseQuery,
    ProgramExerciseResult,
    ProgramExercise,
    ProgramExerciseBodyList,
} from '../model';
import makeNumberedQuery from './idquery';

export default class ProgramExerciseService implements IProgramExerciseService {
    constructor(private readonly programExerciseDA: IProgramExerciseDA) {}

    async insert(body: ProgramExerciseBodyList): Promise<ProgramExerciseResult[]> {
        if (!body.programExercises) {
            throw errors.makeBadRequest('[programExercises] is required');
        }

        body.programExercises.forEach((body) => {
            if (!body.order || !body.programId || !body.exerciseId) {
                throw errors.makeBadRequest(
                    '[programExercises.order, programExercises.programId, programExercises.exerciseId] is required'
                );
            }
        });

        return await this.programExerciseDA.insert(
            body.programExercises.map((body) => {
                return {
                    exerciseId: body.exerciseId,
                    programId: body.exerciseId,
                    order: body.order,
                };
            })
        );
    }

    async read(query: ProgramExerciseQuery): Promise<ProgramExerciseResult[]> {
        const queries: Query[] = this.programExerciseQueryToQueries(query);
        return await this.programExerciseDA.read(queries);
    }

    async update(fields: ProgramExercise): Promise<ProgramExerciseResult> {
        return await this.programExerciseDA.update(fields);
    }

    async delete(query: ProgramExerciseQuery): Promise<void> {
        const queries: Query[] = this.programExerciseQueryToQueries(query);

        if (queries.length == 0) {
            return;
        }

        await this.programExerciseDA.delete(queries);
    }

    programExerciseQueryToQueries(query: ProgramExerciseQuery): Query[] {
        const queries: Query[] = [];

        if (query.exerciseIds) {
            queries.push(makeNumberedQuery('exerciseId', query.exerciseIds));
        }

        if (query.programIds) {
            queries.push(makeNumberedQuery('programId', query.programIds));
        }

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        return queries;
    }
}
