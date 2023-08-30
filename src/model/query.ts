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
    const rangeNumbers: number[] = [];

    const filtered = split.filter((val: string) => {
        if (isNumber) {
            if (val.includes('-')) {
                const range = val.split('-');

                if (range.length != 2) {
                    throw errors.makeInternal(
                        'included range must be of format [num1]-[num2]]'
                    );
                }

                const begin = parseInt(range[0]);
                const end = parseInt(range[1]);

                if (Number.isNaN(begin) || Number.isNaN(end)) {
                    throw errors.makeInternal('numbers in range are non-numeric');
                }

                for (let number = begin; number <= end; ++number) {
                    rangeNumbers.push(number);
                }

                return false;
            }
            const valToNum = parseInt(val);

            if (Number.isNaN(valToNum)) {
                throw errors.makeInternal(`${val} is non-numberic`);
            }
        }
        return true;
    });

    let value: string[] | number[] = filtered;
    if (isNumber) {
        value = split
            .map((val: string) => {
                return parseInt(val);
            })
            .filter((num: number) => {
                return !rangeNumbers.includes(num);
            });

        value.push(...rangeNumbers);
    }
    console.log(value);
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
