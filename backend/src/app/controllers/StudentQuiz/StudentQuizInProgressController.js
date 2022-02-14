// SERVICES
import GetStudentQuizzesInProgressService from '../../services/StudentQuiz/GetStudentQuizzesInProgress';

class StudentQuizInProgressController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentQuizInProgress =
        await GetStudentQuizzesInProgressService.execute(req);

      return res.status(200).json(studentQuizInProgress);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentQuizInProgressController();
