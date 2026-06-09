import courseModel from "../../models/course/course.js";

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
