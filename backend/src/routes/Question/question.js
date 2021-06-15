// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import Question from "../app/controllers/QuestionController/QuestionController";
import QuestionQuiz from '../app/controllers/QuestionController/QuestionQuizController'
import QuestionTag from '../app/controllers/QuestionController/QuestionTagController'

router.post("/create", Question.store);
router.get("/", Question.index);
router.get("/:tag", Question.show);
router.post("/getFromTags", QuestionTag.index);
router.get("/quiz/:id", QuestionQuiz.index);
router.delete("/delete", Question.delete);


export default router;
