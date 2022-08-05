// MODELS
import Answer from '../../models/AnswerModel';
import File from '../../models/FileModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import QuestionRepository from '../../repositories/Question';

class QuestionsByTagsService {
  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  // Retorna as questões que possuem as tags passadas
  async index(props) {
    const { aimedTagQuestions: propsTags, typeOfFilter } = props;

    const aimedTagQuestions = [
      ...new Set(propsTags.map((element) => element.toLowerCase().trim())),
    ];

    const questions = await this.questionRepository.findAll({
      where: {
        availableOnQuestionsDb: true,
      },
      include: [
        {
          model: Answer,
          as: 'answer',
          attributes: ['id', 'title', 'isCorrect'],
        },
        {
          model: File,
          as: 'imageQuestion',
          attributes: ['url', 'path', 'name'],
        },
        {
          model: Tag,
          as: 'tagsQuestion',
          attributes: ['name'],
          require: true,
          through: {
            attributes: [],
          },
        },
      ],
      order: [
        [
          {
            model: Answer,
            as: 'answer',
          },
          'id',
          'ASC',
        ],
      ],
    });

    const filteredQuestionByTag = await Promise.all(
      // eslint-disable-next-line consistent-return
      questions.map(async (item) => {
        const questionTags = (await item.getTagsQuestion()).map(
          (element) => element.name
        );

        const arrayResult = questionTags.filter((element) =>
          aimedTagQuestions.includes(element)
        );

        // Verificando operação lógica AND (intersecção)
        if (
          arrayResult.length === aimedTagQuestions.length &&
          typeOfFilter.toLowerCase().trim() === 'and'
        ) {
          return item;
        }

        // Verificando operação lógica OR (conjunção)
        if (
          arrayResult.length > 0 &&
          typeOfFilter.toLowerCase().trim() === 'or'
        ) {
          return item;
        }
      })
    );

    const filteredQuestionByTagWithoutUndefined =
      filteredQuestionByTag.filter(Boolean);

    if (!filteredQuestionByTagWithoutUndefined.length) {
      const error = new Error();
      error.status = 404;
      error.response = 'Não existe nenhuma questão cadastrada!';
      throw error;
    }

    return filteredQuestionByTagWithoutUndefined;
  }
}

export default new QuestionsByTagsService();
