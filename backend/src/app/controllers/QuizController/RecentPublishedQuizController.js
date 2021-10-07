// MODELS
import Student from '../../models/StudentModel';
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

class RecentPublishedQuizController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const student_id = req.userId;

      const quizzes = await Quiz.findAll({
        where: {
          published: true,
          visibility: 'public',
        },
        limit: 10,
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'id_image',
          'pin',
          'image_base64',
          'publish_date',
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
        order: [['publish_date', 'DESC']],
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

      return res.status(200).json(returnedQuizzes);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new RecentPublishedQuizController();
