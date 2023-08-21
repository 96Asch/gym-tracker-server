import { Router } from "express";
import defaultRoute from "./default";

const routes = Router();

routes.use(defaultRoute);

export default routes;
