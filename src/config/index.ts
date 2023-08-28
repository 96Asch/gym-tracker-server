import express from 'express';
import env from './environment';
import { Application } from './server';
import routes from '../routes';
import errorHandler from '../routes/error';
import { sequelizeInstance } from '../sequelize';

const application: Application = {
    client: express(),

    initialize: function (): void {
        sequelizeInstance
            .authenticate()
            .then(() => {
                console.log('Connection to postgres succeeded');
            })
            .catch((error) => {
                console.error(error);
                process.exit(1);
            });

        this.client.use(express.json());
        this.client.use(routes);
        this.client.use(errorHandler);
    },

    run: function (): void {
        this.client.listen(env.PORT, () => {
            console.log(`Application started on port ${env.PORT}`);
        });
    },
};

export default application;
