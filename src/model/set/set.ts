import { ExerciseResult } from '../exercise';
import { Program } from '../program';

export interface Set {
    id?: number;
    repetitions?: number;
    programExerciseId?: number;
    exerciseId?: number;
    weightInKg?: number;
    double?: boolean;
}

export interface SetResult {
    id: number;
    repetitions: number;
    weightInKg: number;
    double: boolean;
    createdAt?: Date;
}

export type SetBody = Omit<Set, 'id'>;

export interface SetQuery {
    ids?: string;
    repetitions?: string;
    weightInKg?: string;
    programIds?: string;
    exerciseIds?: string;
    double?: string;
    nested: string;
}
