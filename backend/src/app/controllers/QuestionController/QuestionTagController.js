// SERVICES
import QuestionsByTagsService from '../../services/Question/QuestionsByTags';

class QuestionTagController {
  // Lista todas as questões de acordo com as tags informadas
  async index(req, res) {
    try {
      const { aimedTagQuestions, typeOfFilter } = req.body;

      const questions = await QuestionsByTagsService.index({
        aimedTagQuestions,
        typeOfFilter,
      });

      return res.status(200).json(questions);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuestionTagController();
