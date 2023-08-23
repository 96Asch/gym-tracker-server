import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/error';

export default function errorHandler(
    err: Error,
    _: Request,
    res: Response,
    next: NextFunction
) {
    let status = 500;
    let message = err.message;
    console.log('errorHandler');

    if (err instanceof AppError) {
        status = err.getStatus();
    }

    res.status(status).json({ error: message });
    next();
}
