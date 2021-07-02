// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import StatisticsQuestionQuizController from "../../app/controllers/StatisticsController/StatisticsQuestionQuizController";
import StatisticsStudentQuizController from "../../app/controllers/StatisticsController/StatisticsStudentQuizController";


router.post("/getQuestionQuizStatistics", StatisticsQuestionQuizController.show);
router.post("/getStudentQuizStatistics", StatisticsStudentQuizController.show);

export default router;
