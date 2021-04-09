// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import TeacherController from '../app/controllers/TeacherController';
import SessionController from '../app/controllers/SessionController';

router.post("/cadastrar", TeacherController.store);
router.post("/login",  SessionController.store);

export default router;
