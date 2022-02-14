// MODELS
import Quiz from '../../models/QuizModel';
import Teacher from '../../models/TeacherModel';
import File from '../../models/FileModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import StudentRepository from '../../repositories/Student';
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class GetQuizzesInProgressService {
  constructor() {
    this.studentRepository = new StudentRepository();
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const studentId = data.userId;
    const page = data.body.page || false;
    const limit = data.body.limit || 3;

    const student = await this.studentRepository.findByPk(studentId);

    if (!student) {
      const error = new Error();
      error.status = 404;
      error.response = 'Aluno não encontrado!';
      throw error;
    }

    const quizzesInProgress = await student.getStudentQuiz({
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
            'idTeacher',
          ],
          include: [
            {
              model: Teacher,
              as: 'teacher',
              attributes: ['name', 'email'],
            },
            {
              model: File,
              as: 'image',
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
      quizzesInProgress.map(async (item) => {
        const questionAmount = await item.quiz.countQuestions();
        const studentChoicesAmount = await item.countQuizQuestionChoice();
        const isFavorite = await this.favoriteStudentQuizRepository.findOne({
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

    return studentQuizInProgress;
  }
}

export default new GetQuizzesInProgressService();
