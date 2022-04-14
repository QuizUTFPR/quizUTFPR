// SERVICES
// import GetFilteredQuestionQuizStatistics from '../../services/Statistics/GetFilteredQuestionQuizStatistics';
// import GetQuestionQuizStatisticsService from '../../services/Statistics/GetQuestionQuizStatistics';
import GetStudentThatFinishedMoreQuizzes from '../../services/Statistics/GetStudentThatFinishedMoreQuizzes';

class ClassStatisticsController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { classId } = req.params;

      // const statistics = await GetQuestionQuizStatisticsService.execute({
      //   quizId,
      // });

      const students = await GetStudentThatFinishedMoreQuizzes.execute({
        classId,
      });

      // const statistics = await GetFilteredQuestionQuizStatistics.execute({
      //   quizId,
      //   classId,
      //   orderBy,
      // });

      return res.status(200).json(students);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassStatisticsController();
