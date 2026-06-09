import { Router } from "express";
import { getProviders } from "../controllers/provider.js";

// import authMiddleware  from "../middleware/auth.js";
const routerProvider = Router();

routerProvider.get("/providers", getProviders);

export default routerProvider;
