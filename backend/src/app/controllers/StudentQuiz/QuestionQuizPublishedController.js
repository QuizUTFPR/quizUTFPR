// SERVICES
import QuestionQuizPublishedService from '../../services/StudentQuiz/QuestionQuizPublished';

class QuestionQuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;
      const { quizId, idStudentQuiz } = req.body;

      const questionQuiz = await QuestionQuizPublishedService.execute({
        studentId,
        quizId,
        idStudentQuiz,
      });

      return res.status(200).json(questionQuiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuestionQuizPublishedController();
