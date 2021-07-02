// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import StatisticsQuizController from "../../app/controllers/StatisticsController/StatisticsQuizController";

router.post("/getQuizStatistics", StatisticsQuizController.show);

export default router;
