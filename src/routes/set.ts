import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { SetBody } from '../model/set';
import { errors } from '../model';
const setRoute = Router();

setRoute.post(
    '/',
    async (req: Request<{}, {}, SetBody, {}>, res: Response, next: NextFunction) => {
        const { body } = req;

        if (body.exerciseId <= 0 || body.programId <= 0) {
            next(errors.makeBadRequest('[exerciseId, programId] cannot be empty or 0'));
        }

        try {
        } catch (error) {}
    }
);

export default setRoute;
