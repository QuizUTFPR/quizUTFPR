// SERVICES
import QuestionsOfQuizService from '../../services/Question/QuestionsOfQuiz';

class QuestionQuizController {
  async index(req, res) {
    try {
      const { id } = req.params;

      const questionsOfQuiz = await QuestionsOfQuizService.index({ id });
      console.log(questionsOfQuiz);

      return res.status(200).json(questionsOfQuiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuestionQuizController();
