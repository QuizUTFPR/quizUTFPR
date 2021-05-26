// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// ROUTES
import Teacher from "./teacher";
import File from "./file";
import Quiz from "./quiz";
import Question from './question'
import Tag from './tag'

//MIDDLEWARES
import verifyJWT from "../app/middlewares/jwtVerify";

router.use("/", Teacher);

//Todas as rotas abaixo que forem chamadas abaixo deveram ser autenticadas
router.use(verifyJWT);

router.use("/files", File);
router.use("/quiz", Quiz);
router.use("/question", Question);
router.use("/tag", Tag);

export default router;
