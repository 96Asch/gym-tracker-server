import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { programService } from '../service';
import { ProgramBody, ProgramQuery, errors } from '../model/';

const programRoute = Router();

programRoute.post(
    '/',
    async (req: Request<{}, {}, ProgramBody, {}>, res: Response, next: NextFunction) => {
        const { body } = req;

        if (!body.name) {
            next(errors.makeBadRequest('name cannot be empty'));

            return;
        }

        if (!body.endDate) {
            next(errors.makeBadRequest('endDate cannot be empty'));

            return;
        }

        if (Number.isNaN(Date.parse(body.endDate))) {
            next(errors.makeBadRequest('endDate is not a valid date'));

            return;
        }

        try {
            const createdProgram = await programService.insert({
                name: body.name,
                endDate: new Date(body.endDate),
            });

            res.status(201).json({ program: createdProgram });
        } catch (error) {
            next(error);
        }
    }
);

programRoute.get(
    '/',
    async (req: Request<{}, {}, {}, ProgramQuery>, res: Response, next: NextFunction) => {
        const { query } = req;

        try {
            const programs = await programService.read(query);
            res.status(200).json({ programs: programs });
        } catch (error) {
            next(error);
        }
    }
);

export default programRoute;
