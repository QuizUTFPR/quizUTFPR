// SERVICES
import GetFilteredStudentQuizStatisticsService from '../../services/Statistics/GetFilteredStudentQuizStatistics';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { quizId, classId, orderBy } = req.body;

      const statistics = await GetFilteredStudentQuizStatisticsService.execute({
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
