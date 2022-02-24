import getAllMethods from '../../utils/getMethodsOfAssociation';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class GetQuizzesFromTagsService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async execute(data) {
    const { aimedTags } = data;

    const quizzes = await this.quizRepository.findAll({
      where: {
        published: true,
      },
    });

    console.log(getAllMethods(quizzes));

    const filteredQuizzesByTag = await Promise.all(
      // eslint-disable-next-line consistent-return
      quizzes.map(async (item) => {
        const quizTags = (await item.getTagsQuiz()).map(
          (element) => element.name
        );
        const intersection = quizTags.filter((element) => {
          console.log('element', element, aimedTags);
          return aimedTags.includes(element);
        });
        if (intersection.length === aimedTags.length) {
          return item;
        }
      })
    );

    const filteredQuizzesByTagWithoutUndefined =
      filteredQuizzesByTag.filter(Boolean);

    if (!filteredQuizzesByTagWithoutUndefined.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhum quiz cadastrado!';
      throw error;
    }

    return filteredQuizzesByTagWithoutUndefined;
  }
}

export default new GetQuizzesFromTagsService();
