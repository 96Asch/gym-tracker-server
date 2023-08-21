import type { Express } from 'express';

export interface Application {
    client: Express;
    initialize: () => void;
    run: () => void;
}
