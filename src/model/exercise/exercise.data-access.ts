import { Query } from '../query';
import type { Exercise } from './exercise';

interface IExerciseDA {
    insert(fields: Exercise): Promise<Exercise>;
    read(queries: Query[]): Promise<Exercise[]>;
    update(fields: Exercise): Promise<Exercise>;
    delete(ids: number[]): Promise<void>;
}

export default IExerciseDA;
