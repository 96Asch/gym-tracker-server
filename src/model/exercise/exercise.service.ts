import Exercise from './exercise';
import ExerciseDA from './exercise.data-access';
import { ExerciseQuery } from './request';

interface IExerciseService {
    insert(fields: Exercise): Promise<Exercise>;
    read(query: ExerciseQuery): Promise<Exercise[]>;
    update(fields: Exercise): Promise<Exercise>;
    delete(ids: number[]): Promise<void>;
}

export default IExerciseService;