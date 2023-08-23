import Router from 'express';
import type { Request, Response, NextFunction } from 'express';

const defaultRoute = Router();

defaultRoute.get('/default', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(
        '<html><head>Test Page</head><body><h1>Welcome</h1></body></html>'
    );
});

export default defaultRoute;
