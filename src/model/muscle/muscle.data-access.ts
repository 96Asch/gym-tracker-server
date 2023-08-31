import type { Query } from '..';
import type { Muscle } from './muscle';

export default interface IMuscleDA {
    insert(program: Muscle): Promise<Muscle>;
    read(queries: Query[]): Promise<Muscle[]>;
    update(program: Muscle): Promise<Muscle>;
    delete(queries: Query[]): Promise<void>;
}
