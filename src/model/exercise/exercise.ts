interface Exercise {
    id?: number | string;
    name?: string;
    target?: string;
}

type ExerciseBody = Omit<Exercise, 'id'>;

interface ExerciseQuery {
    ids?: string;
    targets?: string;
}

export type { Exercise, ExerciseBody, ExerciseQuery };
