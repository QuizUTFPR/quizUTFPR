// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import StudentQuestionChoiceController from '../../app/controllers/StudentQuiz/StudentQuestionChoiceController';
import StudentQuizController from '../../app/controllers/StudentQuiz/StudentQuizController';
import StudentQuizInProgressController from '../../app/controllers/StudentQuiz/StudentQuizInProgressController';
import QuestionQuizPublishedController from '../../app/controllers/StudentQuiz/QuestionQuizPublishedController';
import StudentQuizFinishedController from '../../app/controllers/StudentQuiz/StudentQuizFinishedController';

// Crio uma instância do método Router;
const router = new Router();

router.post('/createChoice', StudentQuestionChoiceController.store);
router.post('/startQuiz', StudentQuizController.store);
router.put('/finishQuiz', StudentQuizController.update);
router.get('/getQuizInProgress', StudentQuizInProgressController.index);
router.get('/getAllFinishedQuizzes', StudentQuizFinishedController.index);
router.post('/getQuestionQuiz/', QuestionQuizPublishedController.index);

export default router;
