import courseModel from "../models/course/course";
import lectureModel from "../models/course/courseLecture";
import courseOverviewModel from "../models/course/courseOverview";
import courseRequestModel from "../models/course/courseRequest";
import courseSectionModel from "../models/course/courseSection";

export const getCourseDetail = async (courseId) => {
  const course = await courseModel
    .findById(courseId)
    .populate("category_id", "cate_name")
    .populate("provider_id", "provider_name")
    .lean();

  if (!course) return null;

  const [requests, overviews, sections] = await Promise.all([
    courseRequestModel.find({ course_id: courseId }).lean(),
    courseOverviewModel.find({ course_id: courseId }).lean(),
    courseSectionModel.find({ course_id: courseId }).lean(),
  ]);

  const lectures = await lectureModel.find({
    section_id: { $in: sections.map((s) => s._id) },
  }).lean();

  const sectionsWithLectures = sections.map((section) => ({
    ...section,
    lectures: lectures.filter(
      (lecture) =>
        lecture.section_id.toString() === section._id.toString()
    ),
  }));

  return {
    course: {
      ...course,
      category_id: course.category_id?._id,
      category_name: course.category_id?.cate_name,
      provider_id: course.provider_id?._id,
      provider_name: course.provider_id?.provider_name,
    },
    requests,
    overviews,
    sections: sectionsWithLectures,
  };
};