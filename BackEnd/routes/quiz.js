import { Router } from "express";
import { createQuizController, deleteQuestion, deleteQuizController, getQuestionAndAnswers, updateQuizController } from "../controllers/quiz/quiz.js";


import authMiddleware  from "../middleware/authMiddleware.js";
import authorizeRole  from "../middleware/authorizeRole.js";
import { createQuestionController, updateQuestionController } from "../controllers/quiz/quizQuestion.js";


const routerQuizCourse = Router();

routerQuizCourse.post(
    "/quiz",
    authMiddleware,
    authorizeRole("provider"),
    createQuizController
);
routerQuizCourse.put(
    "/quiz/:id",
    authMiddleware,
    authorizeRole("provider"),
    updateQuizController
);


routerQuizCourse.delete(
    "/quiz/:id",
    authMiddleware,
    authorizeRole("provider"),
    deleteQuizController
);


// Question

routerQuizCourse.get(
    "/quiz/:quizId/questions",
    authMiddleware,
    authorizeRole("provider"),
    getQuestionAndAnswers
);

routerQuizCourse.post(
    "/quiz/question",
    authMiddleware,
    authorizeRole("provider"),
    createQuestionController
);
routerQuizCourse.put(
    "/quiz/question/:id",
    authMiddleware,
    authorizeRole("provider"),
    updateQuestionController
);
// Xóa quizz
routerQuizCourse.delete(
    "/quiz/:id",
    authMiddleware,
    authorizeRole("provider"),
    deleteQuizController
);
// Xóa câu hỏi và đáp án
routerQuizCourse.delete(
    "/questions/:questionId",
    authMiddleware,
    authorizeRole("provider"),
    deleteQuestion
);

export default routerQuizCourse;
