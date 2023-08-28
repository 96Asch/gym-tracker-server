import { SetQuery } from './request';
import { Set } from './set';

export interface ISetDA {
    insert(set: Set): Promise<Set>;
    read(query: SetQuery): Promise<Set[]>;
    update(set: Set): Promise<Set>;
    delete(query: SetQuery): Promise<void>;
}
