interface Muscle {
    id?: number;
    name: string;
}

type MuscleBody = Omit<Muscle, 'id'>;

interface MuscleQuery {
    ids?: number;
    name: string;
}

export type { Muscle, MuscleBody, MuscleQuery };
