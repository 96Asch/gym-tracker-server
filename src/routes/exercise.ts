import { Router } from 'express';
import type { Response, Request, NextFunction } from 'express';
import { exerciseService } from '../service';
import { ExerciseBody, ExerciseQuery, errors } from '../model';

const exerciseRoute = Router();

exerciseRoute.post(
    '/',
    async (req: Request<{}, {}, ExerciseBody, {}>, res: Response, next: NextFunction) => {
        const { body } = req;

        if (!body.name || !body.muscleIds) {
            next(errors.makeBadRequest('name or muscleIds cannot be empty'));

            return;
        }

        try {
            const createdExercise = await exerciseService.insert({
                name: body.name,
                muscleIds: body.muscleIds,
            });
            res.status(201).json({
                exercise: createdExercise,
            });
        } catch (error) {
            console.log('catch');
            next(error);
        }
        next();
    }
);

exerciseRoute.get(
    '/',
    async (
        req: Request<{}, {}, {}, ExerciseQuery>,
        res: Response,
        next: NextFunction
    ) => {
        const { query } = req;

        try {
            const exercises = await exerciseService.read(query);
            res.status(200).json({ exercises: exercises });
        } catch (error) {
            next(error);
        }
    }
);

exerciseRoute.patch(
    '/:id',
    async (
        req: Request<{ id: string }, {}, ExerciseBody, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const { id } = req.params;

        const exerciseId = parseInt(id);
        if (Number.isNaN(exerciseId)) {
            next(errors.makeBadRequest(`parameter id: ${id} is non-numeric`));

            return;
        }

        try {
            const exercise = await exerciseService.update({
                id: exerciseId,
                name: body.name,
                muscleIds: body.muscleIds,
            });

            res.status(200).json({ exercise: exercise });
        } catch (error) {
            next(error);
        }
    }
);

exerciseRoute.delete(
    '/',
    async (
        req: Request<{}, {}, {}, ExerciseQuery>,
        res: Response,
        next: NextFunction
    ) => {
        const { query } = req;

        try {
            exerciseService.delete(query);
            res.sendStatus(202);
        } catch (error) {
            next(error);
        }
    }
);

export default exerciseRoute;
