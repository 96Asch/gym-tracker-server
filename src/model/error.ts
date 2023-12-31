import { ValidationError } from 'sequelize';

export class AppError extends Error {
    constructor(message: string, public readonly status: number) {
        super(message);
    }

    getStatus(): number {
        return this.status;
    }
}

const makeDuplicateError = function (modelName: string, duplicateFields: string[]) {
    return new AppError(
        `Instance already exists for fields [${duplicateFields.join(
            ','
        )}] for ${modelName}`,
        409
    );
};

const makeBadRequestVE = function (error: ValidationError) {
    const messages = error.errors.map((err) => {
        return err.message;
    });

    return new AppError(`errors found: [${messages.join(',')}]`, 400);
};

const makeBadRequest = function (reason: string) {
    return new AppError(reason, 400);
};

const makeInternal = function (internalMessage: string) {
    return new AppError(internalMessage, 500);
};

export default Object.freeze({
    makeDuplicateError,
    makeBadRequest,
    makeInternal,
    makeBadRequestVE,
});
