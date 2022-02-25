// Importo apenas Router do pacote Express;
import { Router } from 'express';

// ROUTES ONLY DASHBOARD
import Teacher from './OnlyDashboard/Teacher/teacher';
import QuizDashboard from './OnlyDashboard/Quiz/quiz';
import Question from './OnlyDashboard/Question/question';
import Tag from './OnlyDashboard/Tag/tag';
import Statistics from './OnlyDashboard/Statistics';
import Classes from './OnlyDashboard/Class';

// ROUTES ONLY MOBILE
import Student from './OnlyMobile/Student/student';
import PublishedQuiz from './OnlyMobile/PublishedQuiz/quiz';
import StudentQuiz from './OnlyMobile/Student/studentQuiz';
import QuizMobile from './OnlyMobile/Quiz';
import ClassesMobile from './OnlyMobile/Class';

// MIDDLEWARES
import verifyJWT from '../app/middlewares/jwtVerify';

// Crio uma instância do método Router;
const router = new Router();

router.use('/', Teacher);
router.use('/student', Student);

router.use('/studentQuiz', verifyJWT, StudentQuiz);
router.use('/publishedQuiz', verifyJWT, PublishedQuiz);
router.use('/quiz', verifyJWT, QuizDashboard);
router.use('/quiz', verifyJWT, QuizMobile);
router.use('/question', verifyJWT, Question);
router.use('/tag', verifyJWT, Tag);
router.use('/statistics', verifyJWT, Statistics);
router.use('/class', verifyJWT, Classes);
router.use('/class', verifyJWT, ClassesMobile);

export default router;
