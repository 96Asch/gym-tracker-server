import Router from 'express';
import type { Request, Response, NextFunction } from 'express';
import defaultService from '../service/default';

const defaultRoute = Router();

defaultRoute.get('/default', (req: Request, res: Response, next: NextFunction) => {
    defaultService.get();
    res.status(200).send(
        '<html><head>Test Page</head><body><h1>Welcome</h1></body></html>'
    );
    next();
});

export default defaultRoute;
