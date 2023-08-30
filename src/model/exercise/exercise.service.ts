import type { Exercise, ExerciseQuery } from './exercise';

interface IExerciseService {
    insert(fields: Exercise): Promise<Exercise>;
    read(query: ExerciseQuery): Promise<Exercise[]>;
    update(fields: Exercise): Promise<Exercise>;
    delete(ids: number[]): Promise<void>;
}

export default IExerciseService;
