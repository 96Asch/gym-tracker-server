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

export default muscleRoute;
