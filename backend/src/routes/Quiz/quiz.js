// Importo apenas Router do pacote Express;
import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from '../../config/multer';
import uploadImage from '../../app/middlewares/uploadImage';

// CONTROLLERS
import QuizController from '../../app/controllers/QuizController/QuizController';
import QuizTeacherController from '../../app/controllers/QuizController/QuizTeacherController';
import PublishQuizController from '../../app/controllers/QuizController/PublishQuizController';
import PINQuizController from '../../app/controllers/QuizController/PINQuizController';
import RecentPublishedQuizController from '../../app/controllers/QuizController/RecentPublishedQuizController';
import FavoriteStudentQuizController from '../../app/controllers/FavoriteController/FavoriteStudentQuizController';

// Crio uma instância do método Router;
const router = new Router();
const multerInstance = multer(multerConfig);

router.get('/', QuizTeacherController.index);
router.post('/getRecentQuiz', RecentPublishedQuizController.index);
router.get('/:tag', QuizController.show);

router.put(
  '/update',
  multerInstance.single('file'),
  uploadImage,
  QuizController.update
);

router.delete('/delete', QuizController.delete);

router.post('/favorite', FavoriteStudentQuizController.store);
router.delete('/deleteFavorite', FavoriteStudentQuizController.delete);
router.post(
  '/create',
  multerInstance.single('file'),
  uploadImage,
  QuizController.store
);
router.post('/publish', PublishQuizController.update);
router.post('/getByPIN', PINQuizController.index);

export default router;
