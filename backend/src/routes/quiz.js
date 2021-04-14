// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuizController from "../app/controllers/QuizController";

router.get("/", QuizController.index);
router.post("/create", QuizController.store);
router.get("/:tag", QuizController.show);

export default router;
