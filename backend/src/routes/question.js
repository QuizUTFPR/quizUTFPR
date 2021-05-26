// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import Question from "../app/controllers/QuestionController";
import QuestionQuiz from '../app/controllers/QuestionQuizController'

router.post("/create", Question.store);
router.get("/", Question.index);
router.get("/:tag", Question.show);
router.get("/quiz/:id", QuestionQuiz.index);

export default router;
