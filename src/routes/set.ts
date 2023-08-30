import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { SetBody, SetQuery } from '../model';
import { errors } from '../model';
import { setService } from '../service';
const setRoute = Router();

setRoute.post(
    '/',
    async (req: Request<{}, {}, SetBody, {}>, res: Response, next: NextFunction) => {
        const { body } = req;

        console.log(body);
        console.log(body.double);

        if (
            body.double == null ||
            !body.exerciseId ||
            !body.programId ||
            !body.repetitions ||
            !body.weightInKg
        ) {
            next(errors.makeBadRequest(`missing required fields`));

            return;
        }
        if (body.exerciseId <= 0 || body.programId <= 0) {
            next(errors.makeBadRequest('[exerciseId, programId] cannot be empty or 0'));

            return;
        }

        try {
            const set = await setService.insert(body);
            res.status(201).json({ set: set });
        } catch (error) {
            next(error);
        }
    }
);

setRoute.get(
    '/',
    async (req: Request<{}, {}, {}, SetQuery>, res: Response, next: NextFunction) => {
        const { query } = req;

        try {
            const sets = await setService.read(query);
            res.status(200).json({ sets: sets });
        } catch (error) {
            next(error);
        }
    }
);

export default setRoute;
