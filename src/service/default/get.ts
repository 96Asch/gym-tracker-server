export const makeGet = function () {
    return async function get(): Promise<void> {
        console.log("Get");
    };
};
