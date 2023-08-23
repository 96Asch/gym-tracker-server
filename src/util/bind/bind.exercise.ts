import { AppError } from '../../model';
import { Exercise } from '../../model/exercise';

const makeBindExercise = function () {
    return function makeBindExercise(body: { name?: string; target?: string }): Exercise {
        const { name, target } = body ?? {};

        const invalidFields: string[] = [];

        if (!name) {
            invalidFields.push('name');
        }

        if (!target) {
            invalidFields.push('target');
        }

        if (invalidFields.length > 0) {
            throw AppError.makeBindError(invalidFields);
        }

        return {
            name: name as string,
            target: target as string,
        };
    };
};

export default makeBindExercise;
