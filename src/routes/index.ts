import { Router } from 'express';
import defaultRoute from './default';
import exerciseRoute from './exercise';
import errorHandler from './error';

const routes = Router();

routes.use(defaultRoute);
routes.use('/exercise', exerciseRoute);

export { errorHandler };

export default routes;
