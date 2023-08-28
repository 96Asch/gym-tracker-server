import { Program } from './program';
import { ProgramQuery } from './request';

export interface IProgramDA {
    insert(program: Program): Promise<Program>;
    read(query: Program): Promise<Program[]>;
    update(program: Program): Promise<Program>;
    delete(ids: number[]): Promise<void>;
}
