import Sequelize from 'sequelize';
import * as Yup from 'yup';

// MODELS
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';
import Quiz from '../../models/QuizModel';
import Tag from '../../models/TagModel';

class FavoriteStudentQuizController {
  // exibe todos os registros
  async index(req, res) {
    try {
      const student_id = req.userId;

      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const favorites = await FavoriteStudentQuiz.findAll({
        where: {
          student_id,
        },
        include: [
          {
            model: Quiz,
            as: 'quiz',
            attributes: ['id', 'id_teacher', 'title', 'description', 'pin', 'image_base64', 'publish_date', 'no_time'],
            include: [
              {
                model: Tag,
                as: 'tags_quiz',
                attributes: ['name'],
                through: {
                  attributes: [],
                },
              },
            ]
          },
        ],
        attributes:[],
        offset: page ? (page - 1) * limit : 0,
        limit: page ? limit : null,
      });

      const returnedFavorites = favorites.map((item) => ({
        ...item.dataValues.quiz.dataValues,
        isFavorite: true,
      }));

      return res.status(200).json(returnedFavorites);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        quiz_id: Yup.number().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const student_id = req.userId;
      const { quiz_id } = req.body;

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
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.query))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const student_id = req.userId;
      const { quiz_id } = req.query;

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
