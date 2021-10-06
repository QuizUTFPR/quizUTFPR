// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import QuizController from '../../app/controllers/QuizController/QuizController';
import QuizTeacherController from '../../app/controllers/QuizController/QuizTeacherController';
import PublishQuizController from '../../app/controllers/QuizController/PublishQuizController';
import PINQuizController from '../../app/controllers/QuizController/PINQuizController';
import RecentPublishedQuizController from '../../app/controllers/QuizController/RecentPublishedQuizController';

// Crio uma instância do método Router;
const router = new Router();

router.get('/', QuizTeacherController.index);
router.get('/getRecentQuiz', RecentPublishedQuizController.index);
router.get('/:tag', QuizController.show);

router.put('/update', QuizController.update);

router.delete('/delete', QuizController.delete);

router.post('/create', QuizController.store);
router.post('/publish', PublishQuizController.update);
router.post('/getByPIN', PINQuizController.index);

export default router;
