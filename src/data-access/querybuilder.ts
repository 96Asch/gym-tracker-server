import { Op } from 'sequelize';
import { Query, QueryOperator } from '../model';

const operatorToSequelize = function (operator: QueryOperator): symbol {
    switch (operator) {
        case 'EQ':
            return Op.eq;
        case 'In':
            return Op.in;
        case 'LessThan':
            return Op.lt;
        case 'Between':
            return Op.between;
        case 'LessThanOrEqual':
            return Op.lte;
        case 'StartsWith':
            return Op.startsWith;
    }
};

const buildSequelizeQuery = function (queries: Query[]): Object {
    let statement: Object = {};
    let andClauses: Object = {};

    queries.forEach((query: Query) => {
        if (query.format == 'Nested') {
            statement = {
                include: { all: true, nested: true },
            };
        } else {
            const sym = operatorToSequelize(query.operator);
            andClauses = {
                ...andClauses,
                [query.key]: {
                    [sym]: query.value,
                },
            };
        }
    });

    if (queries.length > 0) {
        statement = {
            ...statement,
            where: {
                ...andClauses,
            },
        };
    }

    return statement;
};

export { buildSequelizeQuery };
