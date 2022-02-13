// Importo apenas Router do pacote Express;
import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from '../../../config/multer';
import uploadImage from '../../../app/middlewares/uploadImage';

// CONTROLLERS
import Question from '../../../app/controllers/QuestionController/QuestionController';
import QuestionQuiz from '../../../app/controllers/QuestionController/QuestionQuizController';
import QuestionTag from '../../../app/controllers/QuestionController/QuestionTagController';

// Crio uma instância do método Router;
const router = new Router();
const multerInstance = multer(multerConfig);

router.post(
  '/create',
  multerInstance.single('file'),
  uploadImage,
  Question.store
);
router.get('/', Question.index);
router.get('/:tag', Question.show);
router.post('/getFromTags', QuestionTag.index);
router.get('/quiz/:id', QuestionQuiz.index);
router.delete('/delete', Question.delete);

export default router;
