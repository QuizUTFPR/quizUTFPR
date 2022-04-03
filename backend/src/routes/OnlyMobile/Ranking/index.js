import { Router } from 'express';

// CONTROLLERS
import QuizRankingController from '../../../app/controllers/RankingController/QuizRankingController';
import ClassRankingController from '../../../app/controllers/RankingController/ClassRankingController';

const router = new Router();

router.post('/getAllQuizRanking', QuizRankingController.index);
router.post('/getAllClassRanking', ClassRankingController.index);

export default router;
