// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import Question from "../app/controllers/QuestionController";

router.post("/create", Question.store);
router.get("/", Question.index);
router.get("/:tag", Question.show);

export default router;
