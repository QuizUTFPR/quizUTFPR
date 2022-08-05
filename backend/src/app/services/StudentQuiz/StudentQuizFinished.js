// MODELS
import StudentQuiz from '../../models/StudentQuiz';
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class StudentQuizFinishedService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const studentId = data.userId;
    const page = data.body.page || false;
    const limit = data.body.limit || 3;

    const quizzesFinished = await this.quizRepository.findAll({
      where: { published: true },
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
        const isFavorite = await this.favoriteStudentQuizRepository.findOne({
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

    return returnedQuizzesFinished;
  }
}

export default new StudentQuizFinishedService();
