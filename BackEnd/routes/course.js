import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  exportCourseExcel,
  getAllCourseOfProvider,
  getCourseById,
  getFeaturedCourses,
  UpdateCourse,
} from "../controllers/course/course.js";
import { getCourses } from "../controllers/course/getCourses.js";
import authorizeRole  from "../middleware/authorizeRole.js";
import authMiddleware  from "../middleware/authMiddleware.js";
import { createCourseOverview, deleteCourseOverview, updateCourseOverview } from "../controllers/course/courseOverView.js";


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

//Thêm tổng quan khóa học
routerCourse.post(
  "/courses/:courseId/overviews",
  authMiddleware,
  authorizeRole("provider"),
  createCourseOverview
);


// Cập nhật khóa học
routerCourse.put(
  "/courses/:id", 
  authMiddleware, 
  authorizeRole('provider'), 
  UpdateCourse  
);

// Cập nhật tổng quan khóa học
routerCourse.put(
  "/courses/:courseId/overviews/:overviewId",
  authMiddleware,
  authorizeRole("provider"),
  updateCourseOverview
);

// Xóa khóa học

routerCourse.delete(
  "/courses/:id", 
  authMiddleware, 
  authorizeRole('provider'), 
  deleteCourse
);

// Xóa tổng quan khóa học
routerCourse.delete(
  "/courses/:courseId/overviews/:overviewId",
  authMiddleware,
  authorizeRole("provider"),
  deleteCourseOverview
);

export default routerCourse;
