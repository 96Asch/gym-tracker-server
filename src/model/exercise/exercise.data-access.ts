import Exercise from './exercise';

interface IExerciseDA {
    insert(fields: Exercise): Promise<Exercise>;
}

export default IExerciseDA;
