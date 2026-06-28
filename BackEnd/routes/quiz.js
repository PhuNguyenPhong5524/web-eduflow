import { Router } from "express";
import { createQuizController, deleteQuizController, updateQuizController } from "../controllers/quiz/quiz.js";


import authMiddleware  from "../middleware/authMiddleware.js";
import authorizeRole  from "../middleware/authorizeRole.js";
import { createQuestionController, deleteQuestionController, updateQuestionController } from "../controllers/quiz/quizQuestion.js";


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
routerQuizCourse.delete(
    "/quiz/question/:id",
    authMiddleware,
    authorizeRole("provider"),
    deleteQuestionController
);



export default routerQuizCourse;
