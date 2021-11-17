// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import QuizPublishedController from '../../app/controllers/QuizController/QuizPublishedController';
// Crio uma instância do método Router;
const router = new Router();

// CASO MANDAR UMA PÁGINA ELE REALIZA A PAGINAÇÃO
// CASO CONTRARIO EXIBE TODOS
router.post('/getAll/', QuizPublishedController.index);
router.post('/getAll/', QuizPublishedController.index);

export default router;
