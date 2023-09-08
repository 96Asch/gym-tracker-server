import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { programExerciseService, programService } from '../service';
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

        if (!body.exerciseIds) {
            next(errors.makeBadRequest('exerciseIds cannot be empty'));

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
                exerciseIds: body.exerciseIds,
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

programRoute.get(
    '/:ids/exercises',
    async (
        req: Request<{ id: string }, {}, {}, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;

        try {
            const programExercises = await programExerciseService.read({
                programIds: id,
            });
            res.status(200).json({ programExercises: programExercises });
        } catch (error) {
            next(error);
        }
    }
);

programRoute.patch(
    '/:id',
    async (
        req: Request<{ id: string }, {}, ProgramBody, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const { id } = req.params;

        const programId = parseInt(id);
        if (Number.isNaN(programId)) {
            next(errors.makeBadRequest('given parameter id is non-numeric'));

            return;
        }

        if (body.endDate && Number.isNaN(Date.parse(body.endDate))) {
            next(errors.makeBadRequest('endDate is not a valid date'));

            return;
        }

        try {
            const program = await programService.update({
                id: programId,
                name: body.name,
                setIds: body.setIds,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
            });

            res.status(201).json({ program: program });
        } catch (error) {
            next(error);
        }
    }
);

programRoute.delete(
    '/',
    async (req: Request<{}, {}, {}, ProgramQuery>, res: Response, next: NextFunction) => {
        const { query } = req;

        try {
            programService.delete(query);
            res.sendStatus(202);
        } catch (error) {
            next(error);
        }
    }
);

export default programRoute;
