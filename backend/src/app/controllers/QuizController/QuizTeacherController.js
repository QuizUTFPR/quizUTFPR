// MODELS
import Teacher from '../../models/TeacherModel';
import Quiz from '../../models/QuizModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

class QuizTeacherController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const id_teacher = req.userId;

      const quizzes = await Quiz.findAll({
        where: {
          id_teacher,
        },
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'id_image',
          'published',
          'pin',
        ],
        include: [
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['name', 'email'],
          },
          {
            model: File,
            as: 'image_quiz',
            attributes: ['url', 'path', 'name'],
          },
          {
            model: Tag,
            as: 'tags_quiz',
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!quizzes.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhum quiz cadastrado.' });

      return res.status(200).json(quizzes);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QuizTeacherController();
