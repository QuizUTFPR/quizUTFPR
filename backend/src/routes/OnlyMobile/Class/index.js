import { Router } from 'express';

// CONTROLLERS
import AvailableStudentClassesController from '../../../app/controllers/ClassController/AvailableStudentClassesController';
import StudentClassesController from '../../../app/controllers/ClassController/StudentClasses';
import ClassStudentController from '../../../app/controllers/ClassController/ClassStudentController';
import ClassQuizController from '../../../app/controllers/ClassController/ClassQuizController';

const router = new Router();

router.get('/availableClasses', AvailableStudentClassesController.index);
router.get('/studentClasses', StudentClassesController.index);
router.get('/getAllClassQuizzes/:idClass', ClassQuizController.index);
router.post('/attachStudent', ClassStudentController.store);
router.delete('/dettachStudent', ClassStudentController.delete);

export default router;
