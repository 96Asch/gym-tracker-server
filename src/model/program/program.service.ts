import { Program } from './program';

export interface IProgramService {
    insert(program: Program): Promise<Program>;
}
