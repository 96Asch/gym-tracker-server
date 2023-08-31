import type { Query } from '../query';
import type { Set, SetQuery, SetResult } from './set';

export interface ISetDA {
    insert(set: Set): Promise<SetResult>;
    read(queries: Query[]): Promise<SetResult[]>;
    update(set: Set): Promise<SetResult>;
    delete(queries: Query[]): Promise<void>;
}
