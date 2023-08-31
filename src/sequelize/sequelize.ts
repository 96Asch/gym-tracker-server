import env from '../config/environment';
import { Sequelize, Transaction } from 'sequelize';

const url = `postgres://${env.PG_USER}:${env.PG_PASS}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DATABASE}`;
console.log(`Connecting to: ${url}`);
const sequelizeInstance = new Sequelize(url);

sequelizeInstance.sync({ alter: true });

const checkConnection = async function () {
    await sequelizeInstance.authenticate();
};

const transaction = async function (): Promise<Transaction> {
    return sequelizeInstance.transaction();
};

export { sequelizeInstance, checkConnection, transaction };
