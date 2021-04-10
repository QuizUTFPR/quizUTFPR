import { Router } from "express"; // de todo o pacote do express, aqui só precisamos do router
import multer from "multer";

const upload = multer(multerConfig);
const router = new Router();

router.post("/files", upload.single("file"), (req, res) => {
  return res.json({ ok: true });
});
