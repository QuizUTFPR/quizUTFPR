// MODELS
import Tag from '../../models/TagModel';
import Quiz from '../../models/QuizModel';

class TagQuizController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const tags = await Tag.findAll({
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
              'id_image',
              'no_time',
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

      if (!tags.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhuma tag com quizzes cadastrada.' });

      return res.status(200).json(tags);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new TagQuizController();
