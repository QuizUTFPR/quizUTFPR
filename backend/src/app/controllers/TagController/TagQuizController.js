// MODELS
import Quiz from '../../models/QuizModel';

// SERVICE
import TagService from '../../services/Tag';

class TagQuizController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tags = await TagService.execute({
        include: [
          {
            model: Quiz,
            as: 'quizzes',
            required: true,
            attributes: [
              'id',
              'title',
              'description',
              'visibility',
              'idImage',
              'noTime',
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
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new TagQuizController();
