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
        `Instance already exists for fields 
        [${duplicateFields.join(',')}] for ${modelName}`,
        401
    );
};

const makeBindError = function (requiredFields: string[]) {
    return new AppError(
        `Could not parse request, missing fields: [${requiredFields.join(', ')}]`,
        401
    );
};

export default Object.freeze({
    makeDuplicateError,
    makeBindError,
});
