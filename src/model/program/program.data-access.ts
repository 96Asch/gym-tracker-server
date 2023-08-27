import { Program } from './program';

export interface IProgramDA {
    insert(program: Program): Promise<Program>;
}
