import { Query } from '../query';
import { ProgramExercise, ProgramExerciseResult } from './programexercise';

export default interface IProgramExerciseDA {
    insert(program: ProgramExercise): Promise<ProgramExerciseResult>;
    read(queries: Query[]): Promise<ProgramExerciseResult[]>;
    update(program: ProgramExercise): Promise<ProgramExerciseResult>;
    delete(queries: Query[]): Promise<void>;
}
