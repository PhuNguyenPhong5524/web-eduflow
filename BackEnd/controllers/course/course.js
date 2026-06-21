import courseModel from "../../models/course/course.js";
import lectureModel from "../../models/course/courseLecture.js";
import courseOverviewModel from "../../models/course/courseOverview.js";
import courseRequestModel from "../../models/course/courseRequest.js";
import courseSectionModel from "../../models/course/courseSection.js";

import "../../models/category.js";
import "../../models/provider.js";

export const getFeaturedCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({
        isActive: true,
        feature: true,
      })
      .populate({
        path: "category_id",
        select: "cate_name",
      })
      .populate({
        path: "provider_id",
        select: "provider_name",
      })
      .sort({ createdAt: -1 });

    const result = courses.map((c) => ({
      _id: c._id,
      category: c.category_id?.cate_name,
      provider: c.provider_id?.provider_name,
      course_title: c.course_title,
      image_url: c.image_url,
      price: c.price,
      price_promotion: c.price_promotion,
      students: c.students,
      feature: c.feature,
    }));

    return res.status(200).json({
      message: "Lấy danh sách khóa học nổi bật thành công!",
      total: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel
      .findById(id)
      .populate("category_id", "cate_name")
      .populate("provider_id", "provider_name")
      .lean();

    if (!course) {
      return res.status(404).json({
        message: "Không tìm thấy khóa học",
      });
    }

    const [requests, overviews, sections] = await Promise.all([
      courseRequestModel.find({ course_id: id }).lean(),
      courseOverviewModel.find({ course_id: id }).lean(),
      courseSectionModel.find({ course_id: id }).lean()
    ]);

    // Lấy tất cả lectures 1 lần
    const lectures = await lectureModel.find({
      section_id: { $in: sections.map(s => s._id) }
    }).lean();

    // Gộp lectures vào section
    const sectionsWithLectures = sections.map(section => ({
      ...section,
      lectures: lectures.filter(l => l.section_id.toString() === section._id.toString())
    }));

    const resultCourse = {
      ...course,
      category_id: course.category_id?._id,
      category_name: course.category_id?.cate_name,
      provider_id: course.provider_id?._id,
      provider_name: course.provider_id?.provider_name
    };


    return res.status(200).json({ 
      course: resultCourse,
      requests,
      overviews,
      sections: sectionsWithLectures 
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

