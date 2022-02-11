// Importo apenas Router do pacote Express;
import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from '../../config/multer';
import uploadImage from '../../app/middlewares/uploadImage';

// CONTROLLERS
import ClassController from '../../app/controllers/ClassController/ClassController';

// Crio uma instância do método Router;
const router = new Router();
const multerInstance = multer(multerConfig);

// CRUD
router.post(
  '/create',
  multerInstance.single('file'),
  uploadImage,
  ClassController.store
);
router.put(
  '/update',
  multerInstance.single('file'),
  uploadImage,
  ClassController.update
);
router.get('/', ClassController.index);
router.post('/getAllClasses', ClassController.show);
router.delete('/delete', ClassController.destroy);

export default router;
