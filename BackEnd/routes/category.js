import { Router } from "express";
import { getCategory } from "../controllers/category.js";

const categoryRouter = Router();

categoryRouter.get("/category", getCategory);
categoryRouter.get("/categories", getCategory);

export default categoryRouter;
