// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import StatisticsQuestionQuizController from '../../app/controllers/StatisticsController/StatisticsQuestionQuizController';
import StatisticsStudentQuizController from '../../app/controllers/StatisticsController/StatisticsStudentQuizController';

// Crio uma instância do método Router;
const router = new Router();

router.post('/getQuestionQuizStatistics', StatisticsQuestionQuizController.show);
router.post('/getStudentQuizStatistics', StatisticsStudentQuizController.show);

export default router;
