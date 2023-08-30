import { Query } from '../query';
import type { Exercise, ExerciseResult } from './exercise';

interface IExerciseDA {
    insert(fields: Exercise): Promise<ExerciseResult>;
    read(queries: Query[]): Promise<ExerciseResult[]>;
    update(fields: Exercise): Promise<ExerciseResult>;
    delete(ids: number[]): Promise<void>;
}

export default IExerciseDA;
