import type { Program, ProgramQuery } from './program';

export default interface IProgramService {
    insert(program: Program): Promise<Program>;
    read(query: ProgramQuery): Promise<Program[]>;
    update(program: Program): Promise<Program>;
    delete(ids: number[]): Promise<Program>;
}
