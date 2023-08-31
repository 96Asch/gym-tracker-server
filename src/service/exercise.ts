import {
    Exercise,
    ExerciseQuery,
    IExerciseDA,
    IExerciseService,
    errors,
    queryBuilder,
} from '../model';
import type { Query } from '../model';
import { ExerciseResult } from '../model/exercise';
import makeNumberedQuery from './idquery';

export default class ExerciseService implements IExerciseService {
    exerciseDA: IExerciseDA;

    constructor(exerciseDA: IExerciseDA) {
        this.exerciseDA = exerciseDA;
    }

    async insert(fields: Exercise): Promise<ExerciseResult> {
        if (!fields.muscleIds || !fields.name) {
            throw errors.makeInternal('fields of Exercise are undefined');
        }

        fields.name = fields.name.trim().toLowerCase();

        if (fields.muscleIds.length == 0) {
            throw errors.makeBadRequest('must give at least one id in muscleIds');
        }

        const exercise = await this.exerciseDA.insert(fields);

        return exercise;
    }

    async read(query: ExerciseQuery): Promise<ExerciseResult[]> {
        const queries = this.setQueryToQueries(query);
        return await this.exerciseDA.read(queries);
    }

    async update(fields: Exercise): Promise<ExerciseResult> {
        if (!fields.id) {
            throw errors.makeBadRequest('id');
        }

        fields.name = fields?.name?.trim().toLowerCase();

        const updatedExercise = await this.exerciseDA.update(fields);
        return updatedExercise;
    }

    async delete(query: ExerciseQuery): Promise<void> {
        const queries = this.setQueryToQueries(query);

        if (queries.length == 0) {
            return;
        }

        await this.exerciseDA.delete(queries);
    }

    setQueryToQueries(query: ExerciseQuery): Query[] {
        const queries: Query[] = [];

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        if (query.name) {
            queries.push(
                queryBuilder.makeSingle(
                    'name',
                    query.name.trim().toLowerCase(),
                    'StartsWith'
                )
            );
        }

        return queries;
    }
}
