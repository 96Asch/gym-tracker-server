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

    if (err instanceof AppError) {
        status = err.getStatus();
    }

    if (status == 500) {
        console.error(message);
        message = 'something went wrong on the server';
    }

    res.status(status).json({ error: message });
    next();
}
