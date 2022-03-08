import { Router } from 'express';

// CONTROLLERS
import AvailableStudentClassesController from '../../../app/controllers/ClassController/AvailableStudentClassesController';
import StudentClassesController from '../../../app/controllers/ClassController/StudentClasses';

const router = new Router();

router.get('/availableClasses', AvailableStudentClassesController.index);
router.get('/studentClasses', StudentClassesController.index);

export default router;
