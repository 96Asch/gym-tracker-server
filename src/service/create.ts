import { Exercise, IExerciseDA, IExerciseService } from '../model';

export class ExerciseService implements IExerciseService {
    exerciseDA: IExerciseDA;

    constructor(exerciseDA: IExerciseDA) {
        this.exerciseDA = exerciseDA;
    }

    async insert(fields: Exercise): Promise<Exercise> {
        const exercise = await this.exerciseDA.insert(fields);

        return exercise;
    }
}
