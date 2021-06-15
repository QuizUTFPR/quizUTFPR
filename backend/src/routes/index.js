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
import StudentQuiz from './student_quiz'
import Student from './student'

//MIDDLEWARES
import verifyJWT from "../app/middlewares/jwtVerify";

router.use("/", Teacher);
router.use('/student', Student);

//Todas as rotas abaixo que forem chamadas abaixo deveram ser autenticadas
router.use('/studentQuiz', verifyJWT, StudentQuiz);
router.use("/files", verifyJWT, File);
router.use("/quiz", verifyJWT, Quiz);
router.use("/question", verifyJWT, Question);
router.use("/tag", verifyJWT, Tag);

export default router;
