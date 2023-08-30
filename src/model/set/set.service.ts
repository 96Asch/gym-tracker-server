import type { Set, SetQuery, SetResult } from './set';

export interface ISetService {
    insert(set: Set): Promise<SetResult>;
    read(query: SetQuery): Promise<SetResult[]>;
    update(set: Set): Promise<SetResult>;
    delete(query: SetQuery): Promise<void>;
}
