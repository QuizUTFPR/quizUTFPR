// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import QuestionTrueOrFalse from "../app/controllers/QuestionTrueOrFalseController";

router.post("/trueOrFalse/create", QuestionTrueOrFalse.store);

export default router;
