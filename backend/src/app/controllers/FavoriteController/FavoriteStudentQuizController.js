import * as Yup from 'yup';

// MODELS
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';
import Quiz from '../../models/QuizModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

class FavoriteStudentQuizController {
  // exibe todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;

      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const favorites = await FavoriteStudentQuiz.findAll({
        where: {
          studentId,
        },
        include: [
          {
            model: Quiz,
            as: 'quiz',
            attributes: [
              'id',
              'idTeacher',
              'title',
              'description',
              'pin',
              'publishDate',
              'noTime',
              'idImage',
            ],
            include: [
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
          },
        ],
        attributes: ['quizId'],
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
        quizId: Yup.number().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const studentId = req.userId;
      const { quizId } = req.body;

      const favorite = await FavoriteStudentQuiz.create({
        quizId,
        studentId,
      });

      return res.status(200).json(favorite);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const schema = Yup.object().shape({
        quizId: Yup.number().required(),
      });

      // Check body of requisiton
      if (!(await schema.isValid(req.query))) {
        return res.status(400).json({ error: 'Corpo de requisição inválido!' });
      }

      const studentId = req.userId;
      const { quizId } = req.query;

      const favoriteInstance = await FavoriteStudentQuiz.findOne({
        where: {
          quizId,
          studentId,
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
