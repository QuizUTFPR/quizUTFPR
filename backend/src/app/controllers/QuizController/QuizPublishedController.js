// MODELS
import Student from '../../models/StudentModel';
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';

class QuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const student_id = req.userId;
      const { page } = req.params;

      const quizzes = await Quiz.findAll({
        where: {
          published: true,
          visibility: 'public',
        },
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
        offset: page ? (page - 1) * 3 : 0,
        limit: page ? 3 : null,
      });

      const quizzesInProgress = (
        await (
          await Student.findByPk(student_id)
        ).getStudent_quiz({
          where: {
            is_finished: false,
          },
        })
      ).map((item) => item.quiz_id);

      const returnedQuizzes = quizzes.filter(
        (quiz) => !quizzesInProgress.includes(quiz.id)
      );

      const verifyingFavoriteQuizzes = await Promise.all(
        returnedQuizzes.map(async (quiz) => {
          const isFavorite = await FavoriteStudentQuiz.findOne({
            where: {
              quiz_id: quiz.id,
              student_id,
            },
          });

          return {
            ...quiz.dataValues,
            isFavorite: !!isFavorite,
          };
        })
      );

      // if(!quizzes.length)
      //   return res.status(404).json({error: "Não existe nenhum quiz cadastrado."});

      return res.status(200).json(verifyingFavoriteQuizzes);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new QuizPublishedController();
