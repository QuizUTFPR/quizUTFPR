import Sequelize from 'sequelize';
import * as Yup from 'yup';

// MODELS
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';
import Quiz from '../../models/QuizModel';

class FavoriteStudentQuizController {
  // exibe todos os registros
  async index(req, res) {
    try {
      const schema = Yup.object().shape({
        student_id: Yup.number().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const { student_id } = req.body;

      const favorites = await FavoriteStudentQuiz.findAll({
        where: {
          student_id,
        },
        include: [
          {
            model: Quiz,
            as: 'quiz',
            attributes: [],
          },
        ],
        attributes: [
          [Sequelize.literal('quiz.id'), 'id'],
          [Sequelize.literal('quiz.id_teacher'), 'id_teacher'],
          [Sequelize.literal('quiz.title'), 'title'],
          [Sequelize.literal('quiz.description'), 'description'],
          [Sequelize.literal('quiz.pin'), 'pin'],
          [Sequelize.literal('quiz.image_base64'), 'image_base64'],
          [Sequelize.literal('quiz.publish_date'), 'publish_date'],
        ],
      });

      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        quiz_id: Yup.number().required(),
        student_id: Yup.number().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const { quiz_id, student_id } = req.body;

      const favorite = await FavoriteStudentQuiz.create({
        quiz_id,
        student_id,
      });

      return res.status(200).json(favorite);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const schema = Yup.object().shape({
        quiz_id: Yup.number().required(),
        student_id: Yup.number().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.query))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const { quiz_id, student_id } = req.query;

      const favoriteInstance = await FavoriteStudentQuiz.findOne({
        where: {
          quiz_id,
          student_id,
        },
      });

      favoriteInstance.destroy();

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new FavoriteStudentQuizController();
