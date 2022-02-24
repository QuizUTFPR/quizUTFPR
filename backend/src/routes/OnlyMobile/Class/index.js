import { Router } from 'express';

// CONTROLLERS
import AvailableStudentClassesController from '../../../app/controllers/ClassController/AvailableStudentClassesController';

const router = new Router();

router.get(
  '/availableClasses/:idClass/:studentId',
  AvailableStudentClassesController.index
);
