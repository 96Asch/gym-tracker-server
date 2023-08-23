import { type } from 'os';
import { Exercise, IExerciseDA, ExerciseInterface } from '../model';

class ExerciseDataAccess implements IExerciseDA {
    constructor() {}

    async insert(fields: Exercise): Promise<Exercise> {
        const exercise = await ExerciseInterface.create({
            name: fields.name,
            target: fields.target,
        });

        return {
            id: exercise.id,
            name: exercise.name,
            target: exercise.target,
        };
    }
}

export default ExerciseDataAccess;
