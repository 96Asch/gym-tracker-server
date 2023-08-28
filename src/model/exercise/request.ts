interface ExerciseBody {
    name: string;
    target: string;
}

interface ExerciseQuery {
    ids?: string;
    targets?: string;
}

export { ExerciseBody, ExerciseQuery };
