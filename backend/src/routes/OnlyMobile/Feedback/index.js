import { Router } from 'express';

// CONTROLLERS
import FeedbackController from '../../../app/controllers/FeedbackController/FeedbackController';

const router = new Router();

router.post('/create', FeedbackController.store);

export default router;
