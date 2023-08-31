import type { Muscle, MuscleQuery } from './muscle';

export default interface IMuscleService {
    insert(fields: Muscle): Promise<Muscle>;
    read(query: MuscleQuery): Promise<Muscle[]>;
    update(fields: Muscle): Promise<Muscle>;
    delete(query: MuscleQuery): Promise<void>;
}
