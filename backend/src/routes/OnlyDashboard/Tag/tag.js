// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import Tag from '../../../app/controllers/TagController/TagController';
import TagQuestion from '../../../app/controllers/TagController/TagQuestionController';
import TagQuiz from '../../../app/controllers/TagController/TagQuizController';

// Crio uma instância do método Router;
const router = new Router();

router.get('/', Tag.index);
router.get('/quiz', TagQuiz.index);
router.get('/question', TagQuestion.index);

export default router;
