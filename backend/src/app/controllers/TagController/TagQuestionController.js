// MODELS
import Question from '../../models/QuestionModel';

// SERVICES
import TagService from '../../services/Tag';

class TagQuestionController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tagService = new TagService();
      const tags = await tagService.execute({
        include: [
          {
            model: Question,
            as: 'questions',
            required: true,
            attributes: [
              'id',
              'title',
              'timer',
              'difficulty_level',
              'copy',
              'available_on_questions_db',
              'type',
            ],
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
        (!!error.status && error.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new TagQuestionController();
