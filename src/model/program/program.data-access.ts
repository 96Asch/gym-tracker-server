import { Query } from '../query';
import { Program } from './program';
import { ProgramQuery } from './request';

export interface IProgramDA {
    insert(program: Program): Promise<Program>;
    read(queries: Query[]): Promise<Program[]>;
    update(program: Program): Promise<Program>;
    delete(ids: number[]): Promise<void>;
}
