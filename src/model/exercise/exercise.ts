import { Muscle } from '../muscle';

interface Exercise {
    id?: number | string;
    name: string;
    muscleIds: number[];
}

type ExerciseBody = Omit<Exercise, 'id'>;

interface ExerciseResult {
    id: number;
    name: string;
    muscles: Muscle[];
}

interface ExerciseQuery {
    ids?: string;
    name?: string;
}

export type { Exercise, ExerciseBody, ExerciseResult, ExerciseQuery };
