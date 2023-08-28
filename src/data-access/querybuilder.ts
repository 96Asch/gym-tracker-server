import { Op } from 'sequelize';

export default function buildSequelizeQuery(query: Object): Object {
    let statement: Object = {};
    let andClauses: Object = {};
    let filterUsed = false;

    Object.entries(query).forEach((entry: [string, any]) => {
        const value = entry[1];
        if (value) {
            filterUsed = true;
            let operator: Object = value;

            console.log(value, 'type =>', typeof value);

            switch (typeof value) {
                case 'string':
                    if (value.includes(',')) {
                        console.log(value, 'includes ,');
                        operator = value.split(',');
                    }
                    break;
                default:
                    if (value instanceof Date) {
                        operator = {
                            [Op.lte]: value,
                        };
                    }
                    break;
            }

            andClauses = {
                ...andClauses,
                [entry[0]]: operator,
            };
        }
    });

    if (filterUsed) {
        statement = {
            where: {
                ...andClauses,
            },
        };
    }

    return statement;
}
