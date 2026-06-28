import { createQuiz, deleteQuiz, updateQuiz } from "../../services/quiz/quizService.js";

export const createQuizController = async (req, res) => {

    try {

        const quiz = await createQuiz(req.body);

        return res.status(201).json({
            message: "Tạo Quiz thành công",
            quiz
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};


export const updateQuizController = async (req, res) => {
  try {
    const quiz = await updateQuiz(req.params.id, req.body);

    return res.status(200).json({
      message: "Cập nhật thành công",
      quiz,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const deleteQuizController = async (req, res) => {
    try {

        await deleteQuiz(req.params.id);

        return res.status(200).json({
            message: "Xóa Quiz thành công"
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }
};