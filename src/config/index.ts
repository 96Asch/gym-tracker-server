import express from 'express';
import env from './environment';
import { Application } from './server';
import routes from '../routes';
import sequelize from './postgres';
import errorHandler from '../routes/error';
import type { Request, Response, NextFunction } from 'express';

const application: Application = {
    client: express(),

    initialize: function (): void {
        sequelize
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
        this.client.listen(env.APP_PORT, () => {
            console.log(`Application started on port ${env.APP_PORT}`);
        });
    },
};

export default application;
