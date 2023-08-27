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
        401
    );
};

const makeBindError = function (requiredFields: string[]) {
    return new AppError(
        `Could not parse request, missing fields: [${requiredFields.join(', ')}]`,
        401
    );
};

const makeBadRequest = function (reason: string) {
    return new AppError(reason, 401);
};

const makeInternal = function (internalMessage: string) {
    console.error(internalMessage);
    return new AppError(internalMessage, 500);
};

export default Object.freeze({
    makeDuplicateError,
    makeBindError,
    makeBadRequest,
    makeInternal,
});
