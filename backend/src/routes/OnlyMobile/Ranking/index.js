import { Router } from 'express';

// CONTROLLERS
import QuizRankingController from '../../../app/controllers/RankingController/QuizRankingController';

const router = new Router();

router.post('/getAllQuizRanking', QuizRankingController.index);

export default router;
