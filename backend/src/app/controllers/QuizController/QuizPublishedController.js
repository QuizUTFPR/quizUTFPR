// SERVICES
import QuizPublishedService from '../../services/Quiz/QuizPublished';

class QuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;
      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const quizzes = await QuizPublishedService.execute({
        studentId,
        page,
        limit,
      });

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuizPublishedController();
