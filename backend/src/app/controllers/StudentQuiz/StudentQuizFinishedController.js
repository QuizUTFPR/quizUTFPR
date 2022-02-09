// MODELS
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import StudentQuiz from '../../models/StudentQuiz';
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

class StudentQuizFinishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;

      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const quizzesFinished = await Quiz.findAll({
        where: { published: true },
        attributes: ['id', 'title', 'description', 'pin', 'noTime', 'idImage'],
        include: [
          {
            model: StudentQuiz,
            as: 'quizStudent',
            required: true,
            where: {
              studentId,
            },
          },
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Tag,
            as: 'tagsQuiz',
            attributes: ['name'],
          },
          {
            model: File,
            as: 'image',
            attributes: ['id', 'url', 'path'],
          },
        ],
        offset: page ? (page - 1) * limit : 0,
        limit: page ? limit : null,
      });

      const returnedQuizzesFinished = await Promise.all(
        quizzesFinished.map(async (quiz) => {
          const isFavorite = await FavoriteStudentQuiz.findOne({
            where: {
              quizId: quiz.id,
              studentId,
            },
          });

          const amountOfQuestions = await quiz.countQuestions();

          return {
            ...quiz.dataValues,
            isFavorite: !!isFavorite,
            amountOfQuestions,
          };
        })
      );

      return res.status(200).json(returnedQuizzesFinished);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizFinishedController();
