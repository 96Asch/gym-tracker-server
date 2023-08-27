import { Exercise, ExerciseQuery, IExerciseDA, IExerciseService, errors } from '../model';

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
        query.id = query?.id?.trim();
        query.target = query?.target?.trim().toLowerCase();

        const exercises = await this.exerciseDA.read(query);

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

    async delete(filterOptions: Map<string, string>): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
