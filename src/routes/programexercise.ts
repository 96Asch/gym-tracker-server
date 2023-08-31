import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { ProgramExerciseBody, ProgramExerciseQuery, errors } from '../model';
import { programExerciseService } from '../service';

const programExerciseRoute = Router();

programExerciseRoute.post(
    '/',
    async (
        req: Request<{}, {}, ProgramExerciseBody, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;

        if (!body.exerciseId || !body.programId || !body.order) {
            next(errors.makeBadRequest('[exerciseId, programId, order] are required'));

            return;
        }
        try {
            const programExercise = await programExerciseService.insert(body);
            res.status(201).json({ programExercise: programExercise });
        } catch (error) {
            next(error);
        }
    }
);

programExerciseRoute.get(
    '/',
    async (
        req: Request<{}, {}, {}, ProgramExerciseQuery>,
        res: Response,
        next: NextFunction
    ) => {
        const { query } = req;

        try {
            const programExercises = await programExerciseService.read(query);
            res.status(201).json({ programExercises: programExercises });
        } catch (error) {
            next(error);
        }
    }
);

programExerciseRoute.patch(
    '/:id',
    async (
        req: Request<{ id: string }, {}, ProgramExerciseBody, {}>,
        res: Response,
        next: NextFunction
    ) => {
        const { body } = req;
        const { id } = req.params;

        const programExerciseId = parseInt(id);
        if (Number.isNaN(programExerciseId)) {
            next(errors.makeBadRequest('given parameter id is non-numeric'));

            return;
        }

        try {
            const programExercise = await programExerciseService.update({
                id: programExerciseId,
                ...body,
            });
            res.status(200).json({ programExercise: programExercise });
        } catch (error) {
            next(error);
        }
    }
);

programExerciseRoute.delete(
    '/',
    async (
        req: Request<{}, {}, {}, ProgramExerciseQuery>,
        res: Response,
        next: NextFunction
    ) => {
        const { query } = req;

        try {
            programExerciseService.delete(query);
            res.sendStatus(202);
        } catch (error) {
            next(error);
        }
    }
);

export default programExerciseRoute;
