import { Router } from 'express';
import defaultRoute from './default';
import exerciseRoute from './exercise';
import errorHandler from './error';
import programRoute from './program';

const routes = Router();

routes.use(defaultRoute);
routes.use('/exercises', exerciseRoute);
routes.use('/programs', programRoute);

export { errorHandler };

export default routes;
