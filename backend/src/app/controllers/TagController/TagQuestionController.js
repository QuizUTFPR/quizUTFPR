// MODELS
import Question from '../../models/QuestionModel';

// SERVICES
import TagService from '../../services/Tag';

class TagQuestionController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tags = await TagService.execute({
        include: [
          {
            model: Question,
            as: 'questions',
            required: true,
            attributes: ['availableOnQuestionsDb'],
            where: {
              availableOnQuestionsDb: true,
            },
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ['name'],
        through: {
          attributes: [],
        },
      });

      return res.status(200).json(tags);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new TagQuestionController();
