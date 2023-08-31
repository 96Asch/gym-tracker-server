import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { MuscleBody, MuscleQuery, errors } from '../model';
import { muscleService } from '../service';

const muscleRoute = Router();

muscleRoute.post(
    '/',
    async (req: Request<{}, {}, MuscleBody, {}>, res: Response, next: NextFunction) => {
        const { body } = req;

        if (!body.name) {
            next(errors.makeBadRequest('name field is required'));

            return;
        }

        try {
            const muscle = await muscleService.insert({
                name: body.name,
            });

            res.status(201).json({ muscle: muscle });
        } catch (error) {
            next(error);
        }
    }
);

muscleRoute.get(
    '/',
    async (req: Request<{}, {}, {}, MuscleQuery>, res: Response, next: NextFunction) => {
        const { query } = req;

        try {
            const muscles = await muscleService.read(query);
            res.status(200).json({ muscles: muscles });
        } catch (error) {
            next(error);
        }
    }
);

muscleRoute.put(
    '/:id',
    async (
        req: Request<{ id: string }, {}, MuscleBody, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const { id } = req.params;

        const muscleId = parseInt(id);
        if (Number.isNaN(muscleId)) {
            next(errors.makeBadRequest('parameter [id] is non-numeric'));

            return;
        }

        if (!body.name) {
            next(errors.makeBadRequest('name field is required'));

            return;
        }

        try {
            const muscle = await muscleService.update({
                id: muscleId,
                name: body.name,
            });

            res.status(201).json({ muscle: muscle });
        } catch (error) {
            next(error);
        }
    }
);

muscleRoute.delete(
    '/',
    async (req: Request<{}, {}, {}, MuscleQuery>, res: Response, next: NextFunction) => {
        const { query } = req;
        try {
            muscleService.delete(query);
            res.sendStatus(202);
        } catch (error) {
            next(error);
        }
    }
);

export default muscleRoute;
