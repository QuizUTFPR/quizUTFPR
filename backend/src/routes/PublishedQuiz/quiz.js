// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuizPublishedController from "../../app/controllers/QuizController/QuizPublishedController";
import QuestionQuizPublishedController from '../../app/controllers/StudentQuiz/QuestionQuizPublishedController'

router.get("/getAll", QuizPublishedController.index);
router.get("/getQuestionQuiz/:id", QuestionQuizPublishedController.index);

export default router;
