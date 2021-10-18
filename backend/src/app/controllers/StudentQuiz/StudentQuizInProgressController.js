// MODELS
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
// import File from '../../models/FileModel';
import Student from '../../models/StudentModel';
import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';

class StudentQuizInProgressController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const student_id = req.userId;

      const student = await Student.findByPk(student_id);
      if (!student)
        return res.status(404).json({ error: 'Aluno não encontrado!' });

      const QuizzesInProgress = await student.getStudent_quiz({
        where: {
          is_finished: false,
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
              'image_base64',
              'no_time',
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
          },
        ],
      });

      const studentQuizInProgress = await Promise.all(
        QuizzesInProgress.map(async (item) => {
          const questionAmount = await item.quiz.countQuestions();
          const studentChoicesAmount = await item.countQuiz_question_choice();
          const isFavorite = await FavoriteStudentQuiz.findOne({
            where: {
              quiz_id: item.quiz.id,
              student_id,
            },
          });

          return {
            id_student_quiz: item.id,
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
