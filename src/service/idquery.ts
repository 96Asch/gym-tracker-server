import { Query, queryBuilder } from '../model';

const makeNumberedQuery = function (key: string, ids: string): Query {
    const trimmedIds = ids.trim();
    if (trimmedIds.includes('-')) {
        return queryBuilder.makeRange(key, trimmedIds, true);
    } else if (trimmedIds.includes(',')) {
        return queryBuilder.makeList(key, trimmedIds, true);
    } else {
        return queryBuilder.makeSingle(key, trimmedIds, 'EQ');
    }
};

export default makeNumberedQuery;
