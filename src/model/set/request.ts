export interface SetBody {
    repetitions: number;
    programId: number;
    exerciseId: number;
    weightInKG: number;
    double: boolean;
}

export interface SetQuery {
    repetitions: string;
    programIds: string;
    exerciseIds: string;
    weight: string;
}
