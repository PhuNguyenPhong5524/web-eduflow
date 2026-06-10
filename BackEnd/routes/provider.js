import { Router } from "express";
import {
  getProviders,
  getProviderCourses,
  seedProviderCourses,
} from "../controllers/provider.js";

// import authMiddleware  from "../middleware/auth.js";
const routerProvider = Router();

routerProvider.get("/providers", getProviders);
routerProvider.get("/providers/:providerId/courses", getProviderCourses);
routerProvider.post("/providers/:providerId/courses/seed", seedProviderCourses);

export default routerProvider;
