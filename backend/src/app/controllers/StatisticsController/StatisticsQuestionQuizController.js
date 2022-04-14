// SERVICES
import GetFilteredQuestionQuizStatistics from '../../services/Statistics/GetFilteredQuestionQuizStatistics';
// import GetQuestionQuizStatisticsService from '../../services/Statistics/GetQuestionQuizStatistics';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { quizId, classId, orderBy } = req.body;
      // const statistics = await GetQuestionQuizStatisticsService.execute({
      //   quizId,
      // });

      const statistics = await GetFilteredQuestionQuizStatistics.execute({
        quizId,
        classId,
        orderBy,
      });

      return res.status(200).json(statistics);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StatisticsQuizController();
