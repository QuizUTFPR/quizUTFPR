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
import StudentMobile from './OnlyMobile/Student/student';
import PublishedQuiz from './OnlyMobile/PublishedQuiz/quiz';
import StudentQuiz from './OnlyMobile/Student/studentQuiz';
import QuizMobile from './OnlyMobile/Quiz';
import ClassesMobile from './OnlyMobile/Class';
import FeedbackMobile from './OnlyMobile/Feedback';
import RankingMobile from './OnlyMobile/Ranking';

// CONTROLLERS
import ClassStudentController from '../app/controllers/ClassController/ClassStudentController';
import RefreshTokenController from '../app/controllers/RefreshTokenController/RefreshTokenController';

// MIDDLEWARES
import verifyJWT from '../app/middlewares/jwtVerify';
import isTeacherVerify from '../app/middlewares/isTeacherVerify';

// Crio uma instância do método Router;
const router = new Router();

router.use('/teacher', Teacher);
router.use('/student', StudentMobile);

// ONLY TEACHER
router.use('/teacherQuiz', isTeacherVerify, QuizDashboard);
router.use('/teacherQuestion', isTeacherVerify, Question);
router.use('/teacherTag', isTeacherVerify, Tag);
router.use('/teacherStatistics', isTeacherVerify, Statistics);
router.use('/teacherClass', isTeacherVerify, Classes);

// ONLY STUDENT
router.use('/studentGameInfo', verifyJWT, StudentQuiz);
router.use('/studentPublishedQuiz', verifyJWT, PublishedQuiz);
router.use('/studentQuiz', verifyJWT, QuizMobile);
router.use('/studentClass', verifyJWT, ClassesMobile);
router.use('/studentFeedback', verifyJWT, FeedbackMobile);
router.use('/studentRanking', verifyJWT, RankingMobile);

// BOTH
router.delete(
  '/class/dettachStudent',
  verifyJWT,
  ClassStudentController.delete
);
router.post('/refresh-token', RefreshTokenController.handle);

router.get('/getAvatars', (req, res) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, '..', '..', 'avatars'));

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
