// MODELS
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import StudentRepository from '../../repositories/Student';
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class QuizPublishedService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.studentRepository = new StudentRepository();
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const { studentId } = data;
    const page = data.page || false;
    const limit = data.limit || 3;

    const quizzes = await this.quizRepository.findAll({
      where: {
        published: true,
        visibility: 'public',
      },
      attributes: [
        'id',
        'title',
        'description',
        'visibility',
        'idImage',
        'pin',
        'noTime',
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
      offset: page ? (page - 1) * limit : 0,
      limit: page ? limit : null,
    });

    const quizzesInProgress = (
      await (
        await this.studentRepository.findByPk(studentId)
      ).getStudentQuiz({
        where: {
          isFinished: false,
        },
      })
    ).map((item) => item.quizId);

    const returnedQuizzes = quizzes.filter(
      (quiz) => !quizzesInProgress.includes(quiz.id)
    );

    const verifyingFavoriteQuizzes = await Promise.all(
      returnedQuizzes.map(async (quiz) => {
        const isFavorite = await this.favoriteStudentQuizRepository.findOne({
          where: {
            quizId: quiz.id,
            studentId,
          },
        });

        return {
          ...quiz.dataValues,
          isFavorite: !!isFavorite,
        };
      })
    );

    return verifyingFavoriteQuizzes;
  }
}

export default new QuizPublishedService();
