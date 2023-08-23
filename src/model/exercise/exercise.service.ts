import Exercise from './exercise';
import ExerciseDA from './exercise.data-access';

interface IExerciseService {
    insert(fields: Exercise): Promise<Exercise>;
}

export default IExerciseService;
