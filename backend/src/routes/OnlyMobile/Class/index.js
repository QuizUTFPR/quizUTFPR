import { Router } from 'express';

// CONTROLLERS
import AvailableStudentClassesController from '../../../app/controllers/ClassController/AvailableStudentClassesController';
import StudentClassesController from '../../../app/controllers/ClassController/StudentClasses';
import ClassStudentController from '../../../app/controllers/ClassController/ClassStudentController';
import ClassQuizController from '../../../app/controllers/ClassController/ClassQuizController';
import PINClassController from '../../../app/controllers/ClassController/PINClassController';

const router = new Router();

router.get('/getByPIN/:pin', PINClassController.index);
router.get('/availableClasses', AvailableStudentClassesController.index);
router.get('/studentClasses', StudentClassesController.index);
router.get('/getAllClassQuizzes/:idClass', ClassQuizController.index);
router.post('/attachStudent', ClassStudentController.store);

export default router;
