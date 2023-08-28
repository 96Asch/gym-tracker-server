import { Router } from 'express';
import defaultRoute from './default';
import exerciseRoute from './exercise';
import errorHandler from './error';
import programRoute from './program';
import setRoute from './set';

const routes = Router();

routes.use(defaultRoute);
routes.use('/exercises', exerciseRoute);
routes.use('/programs', programRoute);
routes.use('/sets', setRoute);

export { errorHandler };

export default routes;
