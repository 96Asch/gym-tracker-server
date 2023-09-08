import {
    ProgramExerciseBody,
    ProgramExerciseQuery,
    ProgramExerciseResult,
    ProgramExercise,
    ProgramExerciseBodyList,
} from './programexercise';

export default interface IProgramExerciseService {
    insert(body: ProgramExerciseBodyList): Promise<ProgramExerciseResult[]>;
    read(query: ProgramExerciseQuery): Promise<ProgramExerciseResult[]>;
    update(fields: ProgramExercise): Promise<ProgramExerciseResult>;
    delete(query: ProgramExerciseQuery): Promise<void>;
}
