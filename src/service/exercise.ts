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
        fields.name = fields?.name?.trim().toLowerCase();

        const exercise = await this.exerciseDA.insert(fields);

        return exercise;
    }

    async read(query: ExerciseQuery): Promise<ExerciseResult[]> {
        const queries: Query[] = [];

        if (query.ids) {
            queries.push(makeNumberedQuery('id', query.ids));
        }

        if (query.name) {
            queries.push(
                queryBuilder.makeSingle(
                    'target',
                    query.name.trim().toLowerCase(),
                    'StartsWith'
                )
            );
        }

        const exercises = await this.exerciseDA.read(queries);

        return exercises;
    }

    async update(fields: Exercise): Promise<ExerciseResult> {
        if (!fields.id) {
            throw errors.makeBadRequest('id');
        }

        fields.name = fields?.name?.trim().toLowerCase();

        const updatedExercise = await this.exerciseDA.update(fields);
        return updatedExercise;
    }

    async delete(ids: number[]): Promise<void> {
        await this.exerciseDA.delete(ids);
    }
}
