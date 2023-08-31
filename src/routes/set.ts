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

        if (
            body.double == null ||
            !body.programExerciseId ||
            !body.repetitions ||
            !body.weightInKg
        ) {
            next(errors.makeBadRequest(`missing required fields`));

            return;
        }
        if (body.programExerciseId <= 0) {
            next(errors.makeBadRequest('[programExerciseId] cannot be empty or 0'));

            return;
        }

        try {
            const set = await setService.insert({ ...body });
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
            const sets = await setService.read({ ...query });
            res.status(200).json({ sets: sets });
        } catch (error) {
            next(error);
        }
    }
);

setRoute.patch(
    '/:id',
    async (
        req: Request<{ id: string }, {}, SetBody, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const { id } = req.params;

        const setId = parseInt(id);
        if (Number.isNaN(setId)) {
            next(errors.makeBadRequest('given parameter id is non-numeric'));

            return;
        }

        try {
            const set = await setService.update({ id: setId, ...body });
            res.status(201).json({ set: set });
        } catch (error) {
            next(error);
        }
    }
);

setRoute.patch(
    '/:id/log',
    async (
        req: Request<{ id: string }, {}, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;

        const setId = parseInt(id);
        if (Number.isNaN(setId)) {
            next(errors.makeBadRequest('given parameter id is non-numeric'));

            return;
        }

        try {
            const set = await setService.update({ id: setId });
            res.status(201).json({ set: set });
        } catch (error) {
            next(error);
        }
    }
);

setRoute.delete(
    '/',
    async (req: Request<{}, {}, {}, SetQuery>, res: Response, next: NextFunction) => {
        const { query } = req;

        try {
            setService.delete(query);
            res.sendStatus(202);
        } catch (error) {
            next(error);
        }
    }
);

export default setRoute;
