import { Router } from 'express';
import defaultRoute from './default';
import exerciseRoute from './exercise';
import errorHandler from './error';
import programRoute from './program';
import setRoute from './set';
import muscleRoute from './muscle';
import programExerciseRoute from './programexercise';

const routes = Router();

routes.use(defaultRoute);
routes.use('/exercises', exerciseRoute);
routes.use('/programs', programRoute);
routes.use('/programexercises', programExerciseRoute);
routes.use('/sets', setRoute);
routes.use('/muscles', muscleRoute);

export { errorHandler };

export default routes;
