import type { Query } from '../query';
import type { Program, ProgramQuery } from './program';

export default interface IProgramDA {
    insert(program: Program): Promise<Program>;
    read(queries: Query[]): Promise<Program[]>;
    update(program: Program): Promise<Program>;
    delete(queries: Query[]): Promise<void>;
}
