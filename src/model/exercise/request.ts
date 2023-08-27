interface ExerciseBody {
    name: string;
    target: string;
}

interface ExerciseQuery {
    id?: string;
    target?: string;
}

export { ExerciseBody, ExerciseQuery };
