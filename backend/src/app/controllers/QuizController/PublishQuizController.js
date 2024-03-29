// SERVICES
import PublishQuizService from '../../services/Quiz/PublishQuiz';

class PublishQuizController {
  async update(req, res) {
    try {
      const { id } = req.body;
      await PublishQuizService.execute(id);

      return res.status(200).json();
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new PublishQuizController();
