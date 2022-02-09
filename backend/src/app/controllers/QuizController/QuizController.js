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

      const quizService = new QuizService();

      const quiz = await quizService.create({
        idTeacher,
        // image_base64: imageBase64,
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
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async index(req, res) {
    try {
      const quizService = new QuizService();
      const quizzes = await quizService.index({
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'id_image',
          'pin',
          'image_base64',
          'no_time',
        ],
        include: [
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['name', 'email'],
          },

          {
            model: Tag,
            as: 'tags_quiz',
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
          {
            model: File,
            as: 'image',
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

      const quizService = new QuizService();
      const quizzes = await quizService.index({
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'id_image',
          'pin',
          'image_base64',
          'no_time',
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
              'difficulty_level',
              'score',
              'copy',
              'available_on_questions_db',
              'type',
            ],
            through: {
              attributes: [],
            },
            include: [
              {
                model: Answer,
                as: 'answer',
                attributes: ['title', 'is_correct'],
              },
              {
                model: Tag,
                as: 'tags_question',
                attributes: ['name'],
                through: {
                  attributes: [],
                },
              },
            ],
          },
          {
            model: Tag,
            as: 'tags_quiz',
            attributes: ['name'],
            where: {
              name: tag,
            },
            through: {
              attributes: [],
            },
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

      const quizService = new QuizService();
      const quiz = await quizService.update({
        id,
        tags,
        title,
        description,
        visibility,
        // imageBase64,
        idImage,
        noTime,
      });

      return res.status(200).json(quiz);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async delete(req, res) {
    try {
      const { id_quiz } = req.body;

      const quizService = new QuizService();
      await quizService.delete(id_quiz);

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
