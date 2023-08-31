import { ExerciseResult } from '../exercise';
import { Program } from '../program';

interface ProgramExercise {
    id?: number;
    order?: number;
    exerciseId?: number;
    programId?: number;
}

type ProgramExerciseBody = Omit<ProgramExercise, 'id'>;

interface ProgramExerciseResult {
    id: number;
    order: number;
    Program?: Program;
    Exercise?: ExerciseResult;
}

interface ProgramExerciseQuery {
    ids?: string;
    programIds?: string;
    exerciseIds?: string;
}

export type {
    ProgramExercise,
    ProgramExerciseBody,
    ProgramExerciseResult,
    ProgramExerciseQuery,
};
