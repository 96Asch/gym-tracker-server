import { Query } from '../query';
import Exercise from './exercise';
import { ExerciseQuery } from './request';

interface IExerciseDA {
    insert(fields: Exercise): Promise<Exercise>;
    read(queries: Query[]): Promise<Exercise[]>;
    update(fields: Exercise): Promise<Exercise>;
    delete(ids: number[]): Promise<void>;
}

export default IExerciseDA;
