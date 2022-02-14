// SERVICES
import GetQuestionQuizStatisticsService from '../../services/Statistics/GetQuestionQuizStatistics';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { quizId } = req.body;
      const statistics = await GetQuestionQuizStatisticsService.execute({
        quizId,
      });

      return res.status(200).json(statistics);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StatisticsQuizController();
