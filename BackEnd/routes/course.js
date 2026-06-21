import { Router } from "express";
import { getCourseById, getFeaturedCourses } from "../controllers/course/course.js";
import { getCourses } from "../controllers/course/getCourses.js";
import authorizeRole  from "../middleware/authorizeRole.js";
import authMiddleware  from "../middleware/authMiddleware.js";

const routerCourse = Router();

// Danh sách khóa học với filter + phân trang
routerCourse.get(
    "/api/courses", 
    authMiddleware,
    authorizeRole("provider"),
    getCourses
);

// Khóa học nổi bật
routerCourse.get("/courses/featured", getFeaturedCourses);
routerCourse.get(
    "/courses-feature", 
    getFeaturedCourses
);
// Khóa học detail
routerCourse.get("/courses/:id", getCourseById);
export default routerCourse;
