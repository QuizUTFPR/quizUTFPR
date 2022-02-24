import { Router } from 'express';

// CONTROLLERS
import FavoriteStudentQuizController from '../../../app/controllers/FavoriteController/FavoriteStudentQuizController';
import PINQuizController from '../../../app/controllers/QuizController/PINQuizController';
import RecentPublishedQuizController from '../../../app/controllers/QuizController/RecentPublishedQuizController';
import QuizTagController from '../../../app/controllers/QuizController/QuizTagController';

const router = new Router();

router.post('/favorite', FavoriteStudentQuizController.store);
router.delete('/deleteFavorite', FavoriteStudentQuizController.delete);
router.post('/getByPIN', PINQuizController.index);
router.post('/getRecentQuiz', RecentPublishedQuizController.index);
router.post('/quizzesByTags', QuizTagController.index);

export default router;
