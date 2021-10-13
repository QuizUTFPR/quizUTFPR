// MODELS
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import StudentQuiz from '../../models/StudentQuiz';
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';

class StudentQuizFinishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const student_id = req.userId;

      const quizzesFinished = await Quiz.findAll({
        where: { published: true },
        attributes: ['id', 'title', 'description', 'pin', 'image_base64'],
        include: [
          {
            model: StudentQuiz,
            as: 'quiz_student',
            required: true,
            where: {
              student_id,
            },
          },
          {
            model: Teacher,
            as: 'teacher',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      const returnedQuizzesFinished = await Promise.all(
        quizzesFinished.map(async (quiz) => {
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

      return res.status(200).json(returnedQuizzesFinished);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizFinishedController();
