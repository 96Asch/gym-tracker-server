import { Set, SetQuery } from '../model/set';
import { ISetDA } from '../model/set/set.data-access';
import SetInterface from '../sequelize/set';

export class SetDA implements ISetDA {
    constructor() {}

    async insert(set: Set): Promise<Set> {
        const createdSet = await SetInterface.create({
            repetitions: set.repetitions,
            programId: set.programId,
            exerciseId: set.exerciseId,
            weightInKg: set.weightInKg,
            double: set.double,
        });

        return createdSet;
    }

    read(query: SetQuery): Promise<Set[]> {
        throw new Error('Method not implemented.');
    }

    update(set: Set): Promise<Set> {
        throw new Error('Method not implemented.');
    }

    delete(query: SetQuery): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
