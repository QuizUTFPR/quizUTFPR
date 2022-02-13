// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import SessionTeacherController from '../../../app/controllers/TeacherController/SessionTeacherController';
import RefreshTokenController from '../../../app/controllers/RefreshTokenController/RefreshTokenController';

// Crio uma instância do método Router;
const router = new Router();

router.post('/login', SessionTeacherController.store);
router.post('/refresh-token', RefreshTokenController.handle);

export default router;
