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
        query.ids = query?.ids?.trim();
        query.targets = query?.targets?.trim().toLowerCase();

        if (query.ids) {
            const ids = query.ids.split(',');
            const nans = ids.filter((id: string) => {
                return Number.isNaN(parseInt(id));
            });

            if (nans.length > 0) {
                throw errors.makeBadRequest(`query [ids] non-numbers: [${nans}]`);
            }
        }

        const exercises = await this.exerciseDA.read({
            id: query.ids,
            target: query.targets,
        });

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
