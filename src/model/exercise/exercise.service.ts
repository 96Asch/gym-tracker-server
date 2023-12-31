import type { Exercise, ExerciseQuery, ExerciseResult } from './exercise';

interface IExerciseService {
    insert(fields: Exercise): Promise<ExerciseResult>;
    read(query: ExerciseQuery): Promise<ExerciseResult[]>;
    update(fields: Exercise): Promise<ExerciseResult>;
    delete(query: ExerciseQuery): Promise<void>;
}

export default IExerciseService;
