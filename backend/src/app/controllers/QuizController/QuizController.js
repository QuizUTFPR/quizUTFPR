import Teacher from '../../models/TeacherModel';
import Question from '../../models/QuestionModel';
import Answer from '../../models/AnswerModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// SERVICES
import QuizService from '../../services/Quiz';

class QuizController {
  async store(req, res) {
    try {
      const idTeacher = req.userId;
      const { idImage } = req;

      const { values } = req.body;
      const { title, tags, description, visibility, published, noTime } =
        JSON.parse(values);

      const quiz = await QuizService.create({
        idTeacher,
        idImage,
        title,
        tags,
        description,
        visibility,
        published,
        noTime,
      });

      return res.status(200).json(quiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async index(req, res) {
    try {
      const quizzes = await QuizService.index({
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'idImage',
          'pin',
          'noTime',
          'idTeacher',
        ],
        include: [
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['name', 'email'],
          },

          {
            model: Tag,
            as: 'tagsQuiz',
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
          {
            model: File,
            as: 'image',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  // exibe com base na tag
  async show(req, res) {
    try {
      const { tag } = req.params;

      const quizzes = await QuizService.index({
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'idImage',
          'pin',
          'noTime',
          'idTeacher',
        ],
        include: [
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['name', 'email'],
          },
          {
            model: Question,
            as: 'questions',
            attributes: [
              'id',
              'index',
              'title',
              'timer',
              'difficultyLevel',
              'score',
              'copy',
              'availableOnQuestionsDb',
              'type',
              'idImage',
            ],
            through: {
              attributes: [],
            },
            include: [
              {
                model: Answer,
                as: 'answer',
                attributes: ['title', 'isCorrect'],
              },
              {
                model: Tag,
                as: 'tagsQuestion',
                attributes: ['name'],
                through: {
                  attributes: [],
                },
              },
              {
                model: File,
                as: 'imageQuestion',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
          {
            model: Tag,
            as: 'tagsQuiz',
            attributes: ['name'],
            where: {
              name: tag,
            },
            through: {
              attributes: [],
            },
          },
          {
            model: File,
            as: 'image',
            attributes: ['id', 'path', 'url'],
          },
        ],
        order: [[{ model: Answer, as: 'answer' }, 'id', 'ASC']],
      });

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async update(req, res) {
    try {
      const { idImage } = req;

      const { values } = req.body;
      const { id, title, tags, description, visibility, noTime } =
        JSON.parse(values);

      const quiz = await QuizService.update({
        id,
        tags,
        title,
        description,
        visibility,
        idImage,
        noTime,
      });

      return res.status(200).json(quiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async delete(req, res) {
    try {
      const { idQuiz } = req.body;

      await QuizService.delete(idQuiz);

      return res.status(200).json();
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuizController();
