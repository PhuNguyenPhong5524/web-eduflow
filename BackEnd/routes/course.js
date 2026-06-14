import { Router } from "express";
import { getFeaturedCourses } from "../controllers/course/course.js";
import { getCourses } from "../controllers/course/getCourses.js";

const routerCourse = Router();

// Danh sách khóa học với filter + phân trang
routerCourse.get("/api/courses", getCourses);

// Khóa học nổi bật
routerCourse.get("/courses/featured", getFeaturedCourses);
routerCourse.get("/courses-feature", getFeaturedCourses);

export default routerCourse;
