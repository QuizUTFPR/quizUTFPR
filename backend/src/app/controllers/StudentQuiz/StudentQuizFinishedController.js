// SERVICES
import StudentQuizFinishedService from '../../services/StudentQuiz/StudentQuizFinished';

class StudentQuizFinishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const finishedQuizzes = await StudentQuizFinishedService.execute(req);

      return res.status(200).json(finishedQuizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentQuizFinishedController();
