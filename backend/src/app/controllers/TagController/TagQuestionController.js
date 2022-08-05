import { fn, col } from 'sequelize';
// MODELS
import Question from '../../models/QuestionModel';

// SERVICES
import TagService from '../../services/Tag';

class TagQuestionController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tags = await TagService.execute({
        attributes: {
          include: [[fn('COUNT', col('questions.id')), 'questionAmount']],
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Question,
            as: 'questions',
            required: true,

            where: {
              availableOnQuestionsDb: true,
            },
            attributes: [],
            through: {
              attributes: [],
            },
          },
        ],
        group: ['name'],
        order: [[col('questionAmount'), 'DESC']],
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
