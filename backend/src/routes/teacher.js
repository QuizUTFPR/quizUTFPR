// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import SessionTeacherController from '../app/controllers/SessionTeacherController';

router.post("/login",  SessionTeacherController.store);

export default router;
