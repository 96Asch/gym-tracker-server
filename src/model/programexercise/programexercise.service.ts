import {
    ProgramExerciseBody,
    ProgramExerciseQuery,
    ProgramExerciseResult,
    ProgramExercise,
} from './programexercise';

export default interface IProgramExerciseService {
    insert(body: ProgramExerciseBody): Promise<ProgramExerciseResult>;
    read(query: ProgramExerciseQuery): Promise<ProgramExerciseResult[]>;
    update(fields: ProgramExercise): Promise<ProgramExerciseResult>;
    delete(query: ProgramExerciseQuery): Promise<void>;
}
