// SERVICES
import GetStudentQuizStatisticsService from '../../services/Statistics/GetStudentQuizStatistics';
import GetFilteredStudentQuizStatisticsService from '../../services/Statistics/GetFilteredStudentQuizStatistics';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      let statistics;
      const { quizId, classId, orderBy } = req.body;

      if (classId) {
        statistics = await GetFilteredStudentQuizStatisticsService.execute({
          quizId,
          classId,
          orderBy,
        });
      } else {
        statistics = await GetStudentQuizStatisticsService.execute({
          quizId,
        });
      }

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
