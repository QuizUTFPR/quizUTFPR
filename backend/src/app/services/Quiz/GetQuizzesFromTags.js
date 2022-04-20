// MODELS
import Teacher from '../../models/TeacherModel';
import File from '../../models/FileModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import FavoriteStudentQuizRepository from '../../repositories/FavoriteStudentQuiz';

class GetQuizzesFromTagsService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.favoriteStudentQuizRepository = new FavoriteStudentQuizRepository();
  }

  async execute(data) {
    const { aimedTags: propsTags, studentId } = data;

    const aimedTags = [
      ...new Set(propsTags.map((element) => element.toLowerCase().trim())),
    ];

    const quizzes = await this.quizRepository.findAll({
      where: {
        published: true,
        visibility: 'public',
      },
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name'],
        },
        {
          model: File,
          as: 'image',
          attributes: ['url', 'path', 'name'],
        },
        {
          model: Tag,
          as: 'tagsQuiz',
        },
      ],
    });

    console.log('QUIZZES', quizzes);
    const filteredQuizzesByTag = [];

    await Promise.all(
      quizzes.map(async (quiz) => {
        const quizTags = (await quiz.getTagsQuiz()).map(
          (element) => element.name
        );

        const intersection = quizTags.filter((element) =>
          aimedTags.includes(element)
        );

        if (intersection.length === aimedTags.length) {
          const didStudentFavoritedThisQuiz =
            await this.favoriteStudentQuizRepository.findOne({
              where: {
                studentId,
                quizId: quiz.id,
              },
            });

          filteredQuizzesByTag.push({
            ...quiz.dataValues,
            isFavorite: !!didStudentFavoritedThisQuiz,
          });
        }
      })
    );

    if (!filteredQuizzesByTag.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhum quiz encontrado!';
      throw error;
    }

    return filteredQuizzesByTag;
  }
}

export default new GetQuizzesFromTagsService();
