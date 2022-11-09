// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import StudentController from '../../../app/controllers/Student/StudentController';

// Crio uma instância do método Router;
const router = new Router();

router.post('/login', StudentController.store);
router.post('/update', StudentController.update);

export default router;
