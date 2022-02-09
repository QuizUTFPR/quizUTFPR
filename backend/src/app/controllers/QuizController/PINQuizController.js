// SERVICES
import PINQuizService from '../../services/Quiz/PINQuiz';

class PINQuizController {
  constructor() {
    this.pinQuizService = new PINQuizService();
  }

  async index(req, res) {
    try {
      const { pin } = req.body;
      const studentId = req.userId;

      const quiz = await this.pinQuizService.findByPin({
        pin,
        studentId,
      });

      return res.status(200).json(quiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new PINQuizController();
