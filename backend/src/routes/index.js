// Importo apenas Router do pacote Express;
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

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
import FeedbackMobile from './OnlyMobile/Feedback';
import RankingMobile from './OnlyMobile/Ranking';

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
router.use('/feedback', verifyJWT, FeedbackMobile);
router.use('/ranking', verifyJWT, RankingMobile);

router.get('/getAvatars', (req, res) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, '..', '..', 'avatars'));

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
