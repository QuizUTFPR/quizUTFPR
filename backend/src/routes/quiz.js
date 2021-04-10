// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuizController from "../app/controllers/QuizController";

router.post("/create", QuizController.store);

export default router;
