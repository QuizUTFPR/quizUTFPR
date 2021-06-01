import { Router } from "express"; // de todo o pacote do express, aqui só precisamos do router
import multer from "multer";
import multerConfig from "../config/multer";
import FileController from '../app/controllers/FileController/FileController'

const upload = multer(multerConfig);
const router = new Router();

router.post("/", upload.single("file"), FileController.store);

export default router;
