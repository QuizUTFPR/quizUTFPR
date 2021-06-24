// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import StudentQuestionChoiceController from "../../app/controllers/StudentQuiz/StudentQuestionChoiceController";
import StudentQuizController from "../../app/controllers/StudentQuiz/StudentQuizController";
import StudentQuizInProgressController from '../../app/controllers/StudentQuiz/StudentQuizInProgressController'

router.post("/createChoice", StudentQuestionChoiceController.store);
router.post("/saveAttemptResult", StudentQuizController.store);
router.get("/getAllChoicesFromQuiz", StudentQuestionChoiceController.index);
router.get("/getQuizInProgress", StudentQuizInProgressController.index)

export default router;
