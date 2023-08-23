import { Router } from 'express';
import type { Response, Request, NextFunction } from 'express';
import { exerciseService } from '../service';
import { bind } from '../util';

const exerciseRoute = Router();

exerciseRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('poset');
    try {
        const exercise = bind.bindExercise(req.body);
        const createdExercise = await exerciseService.insert(exercise);
        res.status(201).json({
            exercise: createdExercise,
        });
    } catch (error) {
        console.log('catch');
        next(error);
    }
    next();
});

export default exerciseRoute;
