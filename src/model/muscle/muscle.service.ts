import type { Muscle, MuscleQuery } from './muscle';

export default interface IMuscleService {
    insert(program: Muscle): Promise<Muscle>;
    read(query: MuscleQuery): Promise<Muscle[]>;
    update(program: Muscle): Promise<Muscle>;
    delete(ids: number[]): Promise<Muscle>;
}
