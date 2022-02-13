// Importo apenas Router do pacote Express;
import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from '../../../config/multer';
import uploadImage from '../../../app/middlewares/uploadImage';

// CONTROLLERS
import QuizController from '../../../app/controllers/QuizController/QuizController';
import QuizTeacherController from '../../../app/controllers/QuizController/QuizTeacherController';
import PublishQuizController from '../../../app/controllers/QuizController/PublishQuizController';

// Crio uma instância do método Router;
const router = new Router();
const multerInstance = multer(multerConfig);

router.get('/', QuizTeacherController.index);
router.get('/:tag', QuizController.show);

router.put(
  '/update',
  multerInstance.single('file'),
  uploadImage,
  QuizController.update
);

router.delete('/delete', QuizController.delete);

router.post(
  '/create',
  multerInstance.single('file'),
  uploadImage,
  QuizController.store
);
router.post('/publish', PublishQuizController.update);

export default router;
