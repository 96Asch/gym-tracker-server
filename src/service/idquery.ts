import { Query, queryBuilder } from '../model';

const makeNumberedQuery = function (key: string, ids: string): Query {
    const trimmedIds = ids.trim();
    console.log(trimmedIds);
    if (trimmedIds.includes(',')) {
        console.log('List');
        return queryBuilder.makeList(key, trimmedIds, true);
    } else if (trimmedIds.includes('-')) {
        console.log('Range');
        return queryBuilder.makeRange(key, trimmedIds, true);
    } else {
        return queryBuilder.makeSingle(key, trimmedIds, 'EQ');
    }
};

export default makeNumberedQuery;
