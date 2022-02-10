import * as Yup from 'yup';

// MODELS
import Answer from '../../models/AnswerModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import AnswerRepository from '../../repositories/Answer';
import QuestionRepository from '../../repositories/Question';
import QuizRepository from '../../repositories/Quiz';
import TagRepository from '../../repositories/Tag';

async function getScoreBasedOnDifficulty(difficulty) {
  switch (difficulty) {
    case 'Muito Fácil':
      return 5;
    case 'Fácil':
      return 10;
    case 'Médio':
      return 15;
    case 'Difícil':
      return 30;
    case 'Muito Difícil':
      return 40;
    default:
      return 0;
  }
}

class QuestionService {
  constructor() {
    this.questionRepository = new QuestionRepository();
    this.quizRepository = new QuizRepository();
    this.answerRepository = new AnswerRepository();
    this.tagRepository = new TagRepository();
  }

  async validate(data) {
    const schema = Yup.object().shape({
      quizId: Yup.number().required(),
      index: Yup.number().required(),
      id: Yup.number().required(),
      copy: Yup.boolean().required(),
      availableOnQuestionsDB: Yup.boolean().required(),
      title: Yup.string()
        .min(1, 'Seu título deve conter pelo menos um caracter.')
        .max(300, 'Máximo de caracteres atingidos.')
        .required(),
      timer: Yup.number().required(),
      difficultyLevel: Yup.string().required(),
      tags: Yup.array()
        .of(Yup.string())
        .required('Informe as tags da questão!'),
      idImage: Yup.number().nullable(),
      type: Yup.string().required('Informe o tipo da questão'),
      answer: Yup.array()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            title: Yup.string().required(),
            isCorrect: Yup.bool().required(),
          })
        )
        .required('Informe as alternativas.'),
    });

    const isValid = await schema.isValid(data);

    return isValid;
  }

  async createQuestion(data) {
    if (!(await this.validate(data))) {
      const questionNotExistsError = new Error('Falha na validação');
      questionNotExistsError.status = 400;
      throw questionNotExistsError;
    }

    const {
      id,
      copy,
      availableOnQuestionsDB,
      title,
      timer,
      difficultyLevel,
      quizId,
      answer,
      tags,
      type,
      idImage,
      index,
    } = data;

    const quiz = await this.quizRepository.findByPk(Number(quizId));

    if (!quiz) {
      const quizNotExistsError = new Error('Quiz não encontrado!');
      quizNotExistsError.status = 404;
      throw quizNotExistsError;
    }

    let question = await this.questionRepository.findById(id);
    const score = await getScoreBasedOnDifficulty(difficultyLevel);

    if (!question) {
      try {
        question = await this.questionRepository.create({
          copy,
          availableOnQuestionsDb: availableOnQuestionsDB,
          title,
          timer,
          difficultyLevel,
          quizId,
          idImage,
          type,
          index,
          score,
        });
      } catch (error) {
        const createQuestionError = new Error(error);
        createQuestionError.status = 500;
        throw createQuestionError;
      }
    } else {
      question.title = title;
      question.index = index;
      question.timer = timer;
      question.difficultyLevel = difficultyLevel;
      question.copy = copy;
      question.type = type;
      question.score = score;
      question.availableOnQuestionsDb = availableOnQuestionsDB;

      let oldImageId = false;
      if (!idImage) {
        oldImageId = question.idImage;
        question.idImage = null;
      } else {
        question.idImage = idImage;
      }

      await question.save();

      if (oldImageId) {
        const image = await File.findByPk(oldImageId);
        await image.destroy();
      }
    }

    // ATUALIZANDO OU CRIANDO AS QUESTÕES
    const idQuestion = question.id;

    // eslint-disable-next-line consistent-return
    answer.map(async (answerItem) => {
      const answerFounded = await this.answerRepository.findById(answerItem.id);
      if (!answerFounded) {
        try {
          await this.answerRepository.create({
            idQuestion,
            title: answerItem.title,
            isCorrect: answerItem.isCorrect,
          });
        } catch (error) {
          const createAnswerError = new Error(error);
          createAnswerError.status = 500;
          throw createAnswerError;
        }
      } else {
        answerFounded.title = answerItem.title;
        answerFounded.isCorrect = answerItem.isCorrect;
        await answerFounded.save();
      }
    });

    const idAnswerReceived = answer.map((item) => item.id);
    const AnswerAlreadyInQuestion = await question.getAnswer();

    // eslint-disable-next-line array-callback-return
    AnswerAlreadyInQuestion.map((item) => {
      if (!idAnswerReceived.find((elementID) => elementID === item.id)) {
        item.destroy();
      }
    });

    await quiz.addQuestion(question);
    // ATUALIZANDO TAG DAS QUESTÕES
    const tagsAlreadyInQuestion = await question.getTagsQuestion();
    const arrayTagsAlreadyInQuestion = tagsAlreadyInQuestion.map(
      (item) => item.name
    );

    tags.map(async (tagObject) => {
      const [tag] = await this.tagRepository.findOrCreate({
        where: {
          name: tagObject,
        },
      });
      if (!arrayTagsAlreadyInQuestion.find((element) => element === tag)) {
        tag.addQuestion(question);
      }
    });

    // REMOVENDO TAGS QUE FORAM RETIRADAS DA QUESTÃO
    // eslint-disable-next-line array-callback-return
    tagsAlreadyInQuestion.map((tagInQuestion) => {
      if (!tags.find((element) => element === tagInQuestion.name)) {
        tagInQuestion.removeQuestion(question);
      }
    });

    return question;
  }

  async index() {
    const questions = this.questionRepository.findAll({
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
          through: {
            attributes: [],
          },
        },
      ],
      order: [[{ model: Answer, as: 'answer' }, 'id', 'ASC']],
    });

    if (!questions.length) {
      const error = new Error('Não existe nenhuma questão cadastrada.');
      error.status = 404;
      throw error;
    }

    return questions;
  }

  async show(props) {
    const { tag } = props;

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
          where: {
            name: tag,
          },
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
      order: [[{ model: Answer, as: 'answer' }, 'id', 'ASC']],
    });

    if (!questions.length) {
      const error = new Error('Não existe nenhuma questão cadastrada.');
      error.status = 404;
      throw error;
    }

    return questions;
  }

  async delete(props) {
    const { id } = props;
    const question = await this.questionRepository.findById(id);

    if (!question) {
      const error = new Error('Questão não encontrada!');
      error.status = 404;
      throw error;
    }

    const answers = await question.getAnswer();
    const tags = await question.getTagsQuestion();

    answers.map((item) => item.destroy());
    tags.map((item) => question.removeTagsQuestion(item));
    question.destroy();

    return question;
  }
}

export default QuestionService;
