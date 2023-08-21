import { makeGet } from "./get";

const get = makeGet();

const defaultService = Object.freeze({
    get,
});

export default defaultService;
