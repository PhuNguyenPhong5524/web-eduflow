import courseModel from "../../models/course/course.js";
import lectureModel from "../../models/course/courseLecture.js";
import courseOverviewModel from "../../models/course/courseOverview.js";
import courseRequestModel from "../../models/course/courseRequest.js";
import courseSectionModel from "../../models/course/courseSection.js";
import quizModel from "../../models/quiz/quiz.js";
import quizQuestionModel from "../../models/quiz/quizQuestion.js";
import quizAnswerModel from "../../models/quiz/quizAnswer.js";


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

  const quizzes = await quizModel.find({
      section_id: {
          $in: sections.map(section => section._id)
      }
  }).lean();
  const questions = await quizQuestionModel.find({
    quiz_id: {
      $in: quizzes.map(q => q._id)
    }
  }).lean();
  const answers = await quizAnswerModel.find({
    question_id: {
      $in: questions.map(q => q._id)
    }
  }).lean();
  const questionsWithAnswers = questions.map(question => ({
    ...question,
    answers: answers.filter(
      answer =>
        answer.question_id.toString() === question._id.toString()
    )
  }));
  const quizzesWithQuestions = quizzes.map(quiz => ({
    ...quiz,
    questions: questionsWithAnswers.filter(
      question =>
        question.quiz_id.toString() === quiz._id.toString()
    )
  }));
  const sectionsWithLectures = sections.map(section => ({
    ...section,

    lectures: lectures.filter(
      lecture =>
        lecture.section_id.toString() === section._id.toString()
    ),

    quizzes: quizzesWithQuestions.filter(
      quiz =>
        quiz.section_id.toString() === section._id.toString()
    )
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