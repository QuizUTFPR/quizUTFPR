// Importo apenas Router do pacote Express;
import { Router } from 'express';

// CONTROLLERS
import StudentController from '../../../app/controllers/Student/StudentController';
import SessionStudentController from '../../../app/controllers/Student/SessionStudentController';
import ClassesOfStudentController from '../../../app/controllers/Student/ClassesOfStudentController';
import LDAPSessionStudentController from '../../../app/controllers/Student/LDAPSessionStudentController';

// Crio uma instância do método Router;
const router = new Router();

router.post('/register', StudentController.store);
router.post('/login', SessionStudentController.store);
router.post('/loginLDAP', LDAPSessionStudentController.store);
router.post('/update', LDAPSessionStudentController.update);

router.post('/classes/:idStudent', ClassesOfStudentController.index);

export default router;
