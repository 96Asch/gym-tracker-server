import Exercise from './exercise';
import { ExerciseQuery } from './request';

interface IExerciseDA {
    insert(fields: Exercise): Promise<Exercise>;
    read(query: Exercise): Promise<Exercise[]>;
    update(fields: Exercise): Promise<Exercise>;
    delete(ids: number[]): Promise<void>;
}

export default IExerciseDA;