// SERVICES
import CreateFeedbackService from '../../services/Feedback/CreateFeedback';

class FeedbackController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const { message, studentId } = req.body;

      console.log('store', req.body);
      const feedback = await CreateFeedbackService.execute({
        message,
        studentId,
      });

      return res.status(200).json(feedback);
    } catch (error) {
      console.log('error', error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new FeedbackController();
