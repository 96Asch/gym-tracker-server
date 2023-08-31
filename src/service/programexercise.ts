import { Query, errors } from '../model';
import type {
    IProgramExerciseDA,
    IProgramExerciseService,
    ProgramExerciseBody,
    ProgramExerciseQuery,
    ProgramExerciseResult,
    ProgramExercise,
} from '../model';
import makeNumberedQuery from './idquery';

export default class ProgramExerciseService implements IProgramExerciseService {
    constructor(private readonly programExerciseDA: IProgramExerciseDA) {}

    async insert(body: ProgramExerciseBody): Promise<ProgramExerciseResult> {
        if (!body.exerciseId || !body.programId || !body.order) {
            throw errors.makeInternal('required fields are empty');
        }

        return await this.programExerciseDA.insert({
            exerciseId: body.exerciseId,
            programId: body.exerciseId,
            order: body.order,
        });
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
