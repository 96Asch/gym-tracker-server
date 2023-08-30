import express from 'express';
import env from './environment';
import { Application } from './server';
import routes from '../routes';
import errorHandler from '../routes/error';
import db from '../sequelize';

const application: Application = {
    client: express(),

    initialize: function (): void {
        db.checkConnection()
            .then(() => {
                console.log('Connection to database succeeded');
            })
            .catch((error: Error) => {
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
