// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import SessionTeacherController from '../../../app/controllers/TeacherController/SessionTeacherController';

// Crio uma instância do método Router;
const router = new Router();

router.post('/login', SessionTeacherController.store);

export default router;
