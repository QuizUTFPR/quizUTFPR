import { Router } from 'express';

// CONTROLLERS
import QuizRankingController from '../../../app/controllers/RankingController/QuizRankingController';
import ClassRankingController from '../../../app/controllers/RankingController/ClassRankingController';
import GlobalRankingController from '../../../app/controllers/RankingController/GlobalRankingController';

const router = new Router();

router.post('/getAllQuizRanking', QuizRankingController.index);
router.post('/getAllClassRanking', ClassRankingController.index);
router.get('/getGlobalRanking', GlobalRankingController.index);

export default router;
