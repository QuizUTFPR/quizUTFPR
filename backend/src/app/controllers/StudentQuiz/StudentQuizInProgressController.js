// MODELS
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';
import Student from '../../models/StudentModel';
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';

class StudentQuizInProgressController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;

      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const student = await Student.findByPk(studentId);
      if (!student)
        return res.status(404).json({ error: 'Aluno não encontrado!' });

      const QuizzesInProgress = await student.getStudentQuiz({
        where: {
          isFinished: false,
        },
        include: [
          {
            model: Quiz,
            as: 'quiz',
            attributes: [
              'id',
              'title',
              'description',
              'pin',
              'noTime',
              'idImage',
            ],
            include: [
              {
                model: Teacher,
                as: 'teacher',
                attributes: ['name', 'email'],
              },
              {
                model: File,
                as: 'imageQuiz',
                attributes: ['url', 'path', 'name'],
              },
              {
                model: Tag,
                as: 'tagsQuiz',
                attributes: ['name'],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
        offset: page ? (page - 1) * limit : 0,
        limit: page ? limit : null,
      });

      const studentQuizInProgress = await Promise.all(
        QuizzesInProgress.map(async (item) => {
          const questionAmount = await item.quiz.countQuestions();
          const studentChoicesAmount = await item.countQuizQuestionChoice();
          const isFavorite = await FavoriteStudentQuiz.findOne({
            where: {
              quizId: item.quiz.id,
              studentId,
            },
          });

          return {
            idStudentQuiz: item.id,
            studentChoicesAmount,
            questionAmount,
            quiz: {
              ...item.quiz.dataValues,
              isFavorite: !!isFavorite,
            },
          };
        })
      );

      return res.status(200).json(studentQuizInProgress);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizInProgressController();
