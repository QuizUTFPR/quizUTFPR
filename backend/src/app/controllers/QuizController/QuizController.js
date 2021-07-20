import * as Yup from 'yup';

// MODELS
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import Question from '../../models/QuestionModel';
import Answer from '../../models/AnswerModel';
import Tag from '../../models/TagModel';
// import File from '../../models/FileModel';

class QuizController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string()
          .min(1, 'Seu título deve conter pelo menos um caracter.')
          .max(300, 'Máximo de caracteres atingidos.')
          .required(),
        description: Yup.string().required(),
        visibility: Yup.string().required().max(10),
        id_image: Yup.number(),
        tags: Yup.array().required('Informe as tags do quiz!'),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ error: 'Falha na validação!' });

      const id_teacher = req.userId;
      const { imageBase64 } = req.body;

      const quiz = await Quiz.create({
        id_teacher,
        image_base64: imageBase64,
        ...req.body,
      });

      const { tags } = req.body;

      tags.map(async (tagObject) => {
        const [tag] = await Tag.findOrCreate({
          where: {
            name: tagObject,
          },
        });

        tag.addQuiz(quiz);
      });
      return res.status(200).json({
        quiz,
      });
    } catch (err) {
      // console.log(err);
      return res.status(500).json(err);
    }
  }

  // Lista todos os registros
  async index(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'id_image',
          'pin',
          'image_base64',
        ],
        include: [
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['name', 'email'],
          },
          // {
          //   model: File,
          //   as: 'image_quiz',
          //   attributes: ['url', 'path', 'name'],
          // },
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
      console.log(err);
      return res.status(500).json(err);
    }
  }

  // Exibe um único registro
  async show(req, res) {
    try {
      const { tag } = req.params;

      const quiz = await Quiz.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'id_image',
          'pin',
          'image_base64',
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

      if (!quiz.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhum quiz com a tag informada.' });

      return res.status(200).json(quiz);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // Altera um único registro
  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        title: Yup.string()
          .min(1, 'Seu título deve conter pelo menos um caracter.')
          .max(300, 'Máximo de caracteres atingidos.')
          .required(),
        description: Yup.string().required(),
        visibility: Yup.string().required().max(10),
        id_image: Yup.number(),
        tags: Yup.array().required('Informe as tags do quiz!'),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ error: 'Falha na validação!' });

      const {
        id,
        tags,
        title,
        description,
        visibility,
        // id_image,
        imageBase64,
      } = req.body;

      const quiz = await Quiz.findByPk(id);
      quiz.title = title;
      quiz.description = description;
      quiz.visibility = visibility;
      quiz.image_base64 = imageBase64;
      // if (id_image) quiz.id_image = id_image;
      quiz.save();

      const tagsAlreadyInQuiz = await quiz.getTags_quiz();
      const arrayTagsAlreadyInQuiz = tagsAlreadyInQuiz.map((item) => item.name);

      tags.map(async (tagObject) => {
        const [tag] = await Tag.findOrCreate({
          where: {
            name: tagObject,
          },
        });

        if (!arrayTagsAlreadyInQuiz.find((element) => element === tag)) {
          tag.addQuiz(quiz);
        }
      });

      // eslint-disable-next-line array-callback-return
      tagsAlreadyInQuiz.map((tagInQuiz) => {
        if (!tags.find((element) => element === tagInQuiz.name)) {
          tagInQuiz.removeQuiz(quiz);
        }
      });

      return res.status(200).json(quiz);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // Remove um único registro
  async delete(req, res) {
    try {
      const { id_quiz } = req.body;

      const quiz = await Quiz.findByPk(id_quiz);

      if (!quiz)
        return res
          .status(404)
          .json({ error: 'Não existe nenhum quiz com o ID informado.' });

      const image_quiz = await quiz.getImage_quiz();
      if (image_quiz) image_quiz.destroy();
      quiz.destroy();

      return res.status(200).json();
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QuizController();
