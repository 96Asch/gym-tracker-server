import Exercise from './exercise';
import { ExerciseQuery } from './request';

interface IExerciseDA {
    insert(fields: Exercise): Promise<Exercise>;
    read(query: ExerciseQuery): Promise<Exercise[]>;
    update(fields: Exercise): Promise<Exercise>;
    delete(filterOptions: Map<string, string>): Promise<void>;
}

export default IExerciseDA;
