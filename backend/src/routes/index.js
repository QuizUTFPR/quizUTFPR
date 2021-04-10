// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

//MODELS
import Teacher from "./teacher";
import File from "./file";

//MIDDLEWARES
import verifyJWT from "../app/middlewares/jwtVerify";

router.use("/", Teacher);

//Todas as rotas abaixo que forem chamadas abaixo deveram ser autenticadas
router.use(verifyJWT);

router.use("/file", File);

router.get("/teste", (req, res) => {
  return res.status(200).json({ message: "Hello World! ;-)" });
});

export default router;
