// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import StudentQuestionChoiceController from "../../app/controllers/StudentQuiz/StudentQuestionChoiceController";

router.post("/createChoice", StudentQuestionChoiceController.store);


export default router;
