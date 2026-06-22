import { Router } from "express";
import {
  createCourse,
  exportCourseExcel,
  getAllCourseOfProvider,
  getCourseById,
  getFeaturedCourses,
} from "../controllers/course/course.js";
import { getCourses } from "../controllers/course/getCourses.js";
import authorizeRole  from "../middleware/authorizeRole.js";
import authMiddleware  from "../middleware/authMiddleware.js";


const routerCourse = Router();

// Danh sách khóa học với filter + phân trang
routerCourse.get("/api/courses", getCourses);
// Danh sách khóa học theo id provider
routerCourse.get(
  "/courses-of-provider",
  authMiddleware,
  authorizeRole("provider"),
  getAllCourseOfProvider
);
// Xuat file excel
routerCourse.get(
  "/my-courses/export-excel",
  authMiddleware,
  authorizeRole("provider"),
  exportCourseExcel
);
// Khóa học nổi bật
routerCourse.get("/courses/featured", getFeaturedCourses);
routerCourse.get("/courses-feature", getFeaturedCourses);
// Khóa học detail
routerCourse.get("/courses/:id", getCourseById);

// Thêm khóa học mới 
routerCourse.post(
  "/courses",
  authMiddleware, 
  authorizeRole('provider'), 
  createCourse
);



export default routerCourse;
