import quizModel from "../../models/quiz/quiz.js";
import courseSectionModel from "../../models/course/courseSection.js";



export const createQuiz = async (data) => {

    const { section_id, title, description } = data;

    // kiểm tra section tồn tại
    const section = await courseSectionModel.findById(section_id);

    if (!section) {
        throw new Error("Section không tồn tại");
    }

    // kiểm tra section đã có quiz chưa
    const existedQuiz = await quizModel.findOne({
        section_id
    });

    if (existedQuiz) {
        throw new Error("Section đã có Quiz");
    }

    const quiz = await quizModel.create({
        section_id,
        title,
        description
    });

    return quiz;
};


export const updateQuiz = async (quizId, data) => {

    const quiz = await quizModel.findByIdAndUpdate(
        quizId,
        data,
        {
            new: true,
            runValidators: true
        }
    );

    if (!quiz) {
        throw new Error("Quiz không tồn tại");
    }

    return quiz;

};


export const deleteQuiz = async (quizId) => {

    const quiz = await quizModel.findById(quizId);

    if (!quiz) {
        throw new Error("Quiz không tồn tại");
    }

    await quiz.deleteOne();

    return;
};


// Question


import quizQuestionModel from "../../models/quiz/quizQuestion.js";
import quizAnswerModel from "../../models/quiz/quizAnswer.js";

export const createQuestion = async (data) => {

    const { quiz_id, question, answers } = data;

    const quiz = await quizModel.findById(quiz_id);

    if (!quiz) {
        throw new Error("Quiz không tồn tại");
    }

    if (!answers || answers.length !== 4) {
        throw new Error("Phải có đúng 4 đáp án");
    }

    const correctAnswer = answers.filter(item => item.is_correct);

    if (correctAnswer.length !== 1) {
        throw new Error("Chỉ được có 1 đáp án đúng");
    }

    const totalQuestion = await quizQuestionModel.countDocuments({
        quiz_id
    });

    const newQuestion = await quizQuestionModel.create({
        quiz_id,
        question,
        order: totalQuestion + 1
    });
    const labels = ["A", "B", "C", "D"];
    await quizAnswerModel.insertMany(

        answers.map((item, index) => ({
            question_id: newQuestion._id,
            answer_label: labels[index],
            answer_text: item.answer_text,
            is_correct: item.is_correct
        }))

    );

    return newQuestion;
};

// Update question

export const updateQuestion = async (questionId, data) => {

    const question = await quizQuestionModel.findByIdAndUpdate(
        questionId,
        data,
        {
            new: true,
            runValidators: true
        }
    );

    if (!question) {
        throw new Error("Câu hỏi không tồn tại");
    }

    return question;
};

// Delete question

export const deleteQuestion = async (questionId) => {

    const question = await quizQuestionModel.findById(questionId);

    if (!question) {
        throw new Error("Câu hỏi không tồn tại");
    }

    await question.deleteOne();

    return;
};

