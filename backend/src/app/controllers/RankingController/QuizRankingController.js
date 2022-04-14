// SERVICES
import GetAllQuizRanking from '../../services/Ranking/GetAllQuizRanking';

class QuizRankingController {
  async index(req, res) {
    try {
      const { quizId, classId } = req.body;

      const quizRanking = await GetAllQuizRanking.execute({
        quizId,
        classId,
      });

      return res.status(200).json(quizRanking);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuizRankingController();
