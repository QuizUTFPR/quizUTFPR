// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuizPublishedController from "../../app/controllers/QuizController/QuizPublishedController";

router.get("/getAll", QuizPublishedController.index);

export default router;
