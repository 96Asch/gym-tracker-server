import { errors } from '.';

type QueryFormat = 'Range' | 'List' | 'Single';
type QueryOperator =
    | 'EQ'
    | 'In'
    | 'LessThan'
    | 'LessThanOrEqual'
    | 'Between'
    | 'StartsWith';

interface Query {
    key: string;
    format: QueryFormat;
    operator: QueryOperator;
    value: string | string[] | number | number[];
}

const makeRange = function (key: string, val: string, isNumber: boolean): Query {
    if (!val.includes('-')) {
        throw errors.makeInternal(`cannot make Range Query of ${val}`);
    }

    const split = val.split('-');

    if (split.length != 2) {
        throw errors.makeInternal(`${key} may only contain one [-]`);
    }

    const faulties = split.filter((val: string) => {
        if (isNumber) {
            return Number.isNaN(parseInt(val));
        }
        return false;
    });

    if (faulties.length > 0) {
        throw errors.makeInternal(`[${faulties}] are non-numeric`);
    }

    let value: string[] | number[] = split;
    if (isNumber) {
        value = split.map((val: string) => {
            return parseInt(val);
        });
    }

    return {
        key: key,
        operator: 'Between',
        format: 'Range',
        value: value,
    };
};

const makeList = function (key: string, val: string, isNumber: boolean): Query {
    if (!val.includes(',')) {
        throw errors.makeInternal(`cannot make List Query of ${val}`);
    }

    const split = val.split(',');

    const faulties = split.filter((val: string) => {
        if (isNumber) {
            return Number.isNaN(parseInt(val));
        }
        return false;
    });

    if (faulties.length > 0) {
        throw errors.makeInternal(`[${faulties}] are non-numeric`);
    }

    let value: string[] | number[] = split;
    if (isNumber) {
        value = split.map((val: string) => {
            return parseInt(val);
        });
    }

    return {
        key: key,
        operator: 'In',
        format: 'List',
        value: value,
    };
};

const makeSingle = function (key: string, val: string, operator: QueryOperator): Query {
    let value: string | number = val;

    if (!Number.isNaN(parseInt(val))) {
        value = parseInt(val);
    }

    return {
        key: key,
        operator: operator,
        format: 'Single',
        value,
    };
};

export type { Query, QueryFormat, QueryOperator };
export default Object.freeze({
    makeList,
    makeRange,
    makeSingle,
});
