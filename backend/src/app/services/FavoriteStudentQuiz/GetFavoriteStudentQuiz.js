// MODELS
import Quiz from '../../models/QuizModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

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

    const returnedFavorites = favorites.map((item) => ({
      ...item.dataValues.quiz.dataValues,
      isFavorite: true,
    }));

    return returnedFavorites;
  }
}

export default new GetFavoriteStudentQuizService();
