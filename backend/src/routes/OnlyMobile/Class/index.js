import { Router } from 'express';

// CONTROLLERS
import AvailableStudentClassesController from '../../../app/controllers/ClassController/AvailableStudentClassesController';

const router = new Router();

router.get('/availableClasses', AvailableStudentClassesController.index);

export default router;
