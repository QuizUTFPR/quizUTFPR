// SERVICES
import RecentPublishedQuizService from '../../services/Quiz/RecentPublishedQuiz';

class RecentPublishedQuizController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;
      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const recentPublishedQuizService = new RecentPublishedQuizService();
      const quizzes = await recentPublishedQuizService.execute({
        studentId,
        page,
        limit,
      });

      return res.status(200).json(quizzes);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new RecentPublishedQuizController();
