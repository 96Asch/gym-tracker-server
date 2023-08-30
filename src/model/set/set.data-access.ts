import type { Query } from '../query';
import type { Set, SetQuery, SetResult } from './set';

export interface ISetDA {
    insert(set: Set): Promise<SetResult>;
    read(query: Query[]): Promise<SetResult[]>;
    update(set: Set): Promise<SetResult>;
    delete(query: SetQuery): Promise<void>;
}
