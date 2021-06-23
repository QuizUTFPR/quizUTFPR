// Importo apenas Router do pacote Express;
import { Router } from "express";
// Crio uma instância do método Router;
const router = new Router();

// ROUTES
import Teacher from "./Teacher/teacher";
import File from "./File/file";
import Quiz from "./Quiz/quiz";
import Question from './Question/question'
import Tag from './Tag/tag'
import StudentQuiz from './Student/student_quiz'
import Student from './Student/student'
import PublishedQuiz from './PublishedQuiz/quiz'

//MIDDLEWARES
import verifyJWT from "../app/middlewares/jwtVerify";

router.use("/", Teacher);
router.use('/student', Student);

//Todas as rotas abaixo que forem chamadas abaixo deveram ser autenticadas
router.use('/studentQuiz', verifyJWT, StudentQuiz);
router.use('/publishedQuiz', verifyJWT, PublishedQuiz);
router.use("/files", verifyJWT, File);
router.use("/quiz", verifyJWT, Quiz);
router.use("/question", verifyJWT, Question);
router.use("/tag", verifyJWT, Tag);

export default router;
