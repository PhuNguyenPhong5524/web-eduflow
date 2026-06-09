import { Router } from "express";
import { getFeaturedCourses } from "../controllers/course/course.js";

const routerCourse = Router();

routerCourse.get("/courses/featured", getFeaturedCourses);
routerCourse.get("/courses-feature", getFeaturedCourses);

export default routerCourse;
