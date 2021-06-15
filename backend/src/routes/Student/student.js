// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// CONTROLLERS
import StudentController from "../../app/controllers/Student/StudentController";
import SessionStudentController from "../../app/controllers/Student/SessionStudentController"

router.post("/register", StudentController.store);
router.post("/login", SessionStudentController.store)

export default router;
