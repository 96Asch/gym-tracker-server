import env from '../config/environment';
import { Sequelize } from 'sequelize';

const url = `postgres://${env.PG_USER}:${env.PG_PASS}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DATABASE}`;
console.log(`Connecting to: ${url}`);
const sequelize = new Sequelize(url);

export default sequelize;
