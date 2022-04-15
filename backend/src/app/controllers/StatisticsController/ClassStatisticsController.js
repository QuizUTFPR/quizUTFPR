// SERVICES
import GetStudentThatFinishedMoreQuizzes from '../../services/Statistics/GetStudentThatFinishedMoreQuizzes';
import GetStudentWhoHitMostQuestions from '../../services/Statistics/GetStudentWhoHitMostQuestions';
import GetStudentThatDidntAnsweredQuizzes from '../../services/Statistics/GetStudentThatDidntAnsweredQuizzes';

class ClassStatisticsController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { type } = req;
      const { classId } = req.params;

      let students;

      if (type === 'GetStudentThatFinishedMoreQuizzes') {
        students = await GetStudentThatFinishedMoreQuizzes.execute({
          classId,
        });
      } else if (type === 'GetStudentWhoHitMostQuestions') {
        students = await GetStudentWhoHitMostQuestions.execute({
          classId,
        });
      } else if (type === 'GetStudentThatDidntAnsweredQuizzes') {
        students = await GetStudentThatDidntAnsweredQuizzes.execute({
          classId,
        });
      }

      return res.status(200).json({
        type,
        students,
      });
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassStatisticsController();
