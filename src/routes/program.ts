import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { programService } from '../service';

const programRoute = Router();

programRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        // const createdProgram = await programService.insert(program);
        // res.status(201).json({ program: createdProgram });
    } catch (error) {
        next(error);
    }
});

export default programRoute;
