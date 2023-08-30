import {
    Exercise,
    ExerciseQuery,
    IExerciseDA,
    IExerciseService,
    errors,
    queryBuilder,
} from '../model';
import type { Query } from '../model';

export class ExerciseService implements IExerciseService {
    exerciseDA: IExerciseDA;

    constructor(exerciseDA: IExerciseDA) {
        this.exerciseDA = exerciseDA;
    }

    async insert(fields: Exercise): Promise<Exercise> {
        fields.name = fields?.name?.trim().toLowerCase();
        fields.target = fields?.target?.trim().toLowerCase();

        const exercise = await this.exerciseDA.insert(fields);

        return exercise;
    }

    async read(query: ExerciseQuery): Promise<Exercise[]> {
        const queries: Query[] = [];

        if (query.ids) {
            const ids = query.ids.trim();
            if (ids.includes('-')) {
                queries.push(queryBuilder.makeRange('id', ids, true));
            } else if (query.ids.includes(',')) {
                queries.push(queryBuilder.makeList('id', ids, true));
            } else {
                queries.push(queryBuilder.makeSingle('id', ids, 'EQ'));
            }
        }

        if (query.targets) {
            queries.push(
                queryBuilder.makeSingle('target', query.targets.trim(), 'StartsWith')
            );
        }

        const exercises = await this.exerciseDA.read(queries);

        return exercises;
    }

    async update(fields: Exercise): Promise<Exercise> {
        if (!fields.id) {
            throw errors.makeBadRequest('id');
        }

        fields.name = fields?.name?.trim().toLowerCase();
        fields.target = fields?.target?.trim().toLowerCase();

        const updatedExercise = await this.exerciseDA.update(fields);
        return updatedExercise;
    }

    async delete(ids: number[]): Promise<void> {
        await this.exerciseDA.delete(ids);
    }
}
