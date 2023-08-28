import { Program } from './program';
import { ProgramQuery } from './request';

export interface IProgramService {
    insert(program: Program): Promise<Program>;
    read(query: ProgramQuery): Promise<Program[]>;
    update(program: Program): Promise<Program>;
    delete(ids: number[]): Promise<Program>;
}
