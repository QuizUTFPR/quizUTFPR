// SERVICES
import CreateStudentQuizService from '../../services/StudentQuiz/CreateStudentQuiz';
import UpdateStudentQuizService from '../../services/StudentQuiz/UpdateStudentQuiz';

class StudentQuizController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const finished = await CreateStudentQuizService.execute(req);

      return res.status(200).json(finished);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }

  async update(req, res) {
    try {
      const studentQuizUpdated = await UpdateStudentQuizService.execute(req);

      return res.status(200).json(studentQuizUpdated);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error.response)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentQuizController();
