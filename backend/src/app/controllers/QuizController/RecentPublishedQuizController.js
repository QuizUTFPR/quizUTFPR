// SERVICES
import RecentPublishedQuizService from '../../services/Quiz/RecentPublishedQuiz';

class RecentPublishedQuizController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;
      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const quizzes = await RecentPublishedQuizService.execute({
        studentId,
        page,
        limit,
      });

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new RecentPublishedQuizController();
