import env from './environment';
import { Options, Sequelize } from 'sequelize';

const url = `postgres://${env.PG_USER}:${env.PG_PASS}@${env.PG_HOST}:${env.PG_PORT}/`;
console.log(`Connecting to: ${url}`);
const sequelize = new Sequelize(url);

export default sequelize;
