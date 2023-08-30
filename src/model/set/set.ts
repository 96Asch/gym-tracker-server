import { ExerciseResult } from '../exercise';
import { Program } from '../program';

export interface Set {
    id?: number;
    repetitions: number;
    programId: number;
    exerciseId: number;
    weightInKg: number;
    double: boolean;
}
export interface SetResult {
    id: number;
    repetitions: number;
    weightInKg: number;
    double: boolean;
    program?: Program;
    exercise?: ExerciseResult;
}
export type SetBody = Omit<Set, 'id'>;

export interface SetQuery {
    ids?: string;
    repetitions?: string;
    weightInKg?: string;
    programIds?: string;
    exerciseIds?: string;
    double?: string;
}
