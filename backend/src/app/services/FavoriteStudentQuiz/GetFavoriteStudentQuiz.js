// MODELS
import Quiz from '../../models/QuizModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';
import StudentQuiz from '../../models/StudentQuiz';

// REPOSITORIES
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class GetFavoriteStudentQuizService {
  constructor() {
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const { studentId } = data;
    const { page } = data || false;
    const { limit } = data || 3;

    console.log('studentId', studentId);

    const favorites = await this.favoriteStudentQuizRepository.findAll({
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
              model: StudentQuiz,
              as: 'quizStudent',
              where: {
                isFinished: false,
                studentId,
                classId: null,
              },
              required: false,
            },
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
      offset: page ? (page - 1) * limit : 0,
      limit: page ? limit : null,
    });

    if (!favorites.length) {
      const error = new Error();
      error.response = 'Não há quizzes favoritados!';
      error.status = 204;
      throw error;
    }

    const returnedFavorites = await Promise.all(
      favorites.map(async (item) => {
        const { quiz } = item.dataValues;
        const { quizStudent, ...restOfQuiz } = quiz.dataValues;
        let studentChoicesAmount = 0;
        const questionAmount = await quiz.countQuestions();

        if (quizStudent.length > 0) {
          studentChoicesAmount = await quizStudent[0].countQuizQuestionChoice();
        }

        return {
          isInProgress: !!quizStudent.length,
          idStudentQuiz: quizStudent.length > 0 ? quizStudent[0].id : null,
          studentChoicesAmount,
          questionAmount,
          quiz: {
            ...restOfQuiz,
            isFavorite: true,
          },
        };
      })
    );

    return returnedFavorites;
  }
}

export default new GetFavoriteStudentQuizService();
