import * as Yup from 'yup';

// MODELS
import Answer from '../../models/AnswerModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import AnswerRepository from '../../repositories/Answer';

// SERVICES
import QuizService from '../Quiz/index';
import TagService from '../Tag';

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
    this.questionRepository = new this.QuestionRepository();
  }

  async validate(data) {
    const schema = Yup.object().shape({
      quiz_id: Yup.number().required(),
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
      id_image: Yup.number().nullable(),
      type: Yup.string().required('Informe o tipo da questão'),
      answer: Yup.array()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            title: Yup.string().required(),
            is_correct: Yup.bool().required(),
          })
        )
        .required('Informe as alternativas.'),
      imageBase64: Yup.string(),
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
      quiz_id,
      answer,
      tags,
      type,
      id_image,
      index,
      imageBase64,
    } = data;

    const quizService = new QuizService();
    const quiz = await quizService.create(quiz_id);

    if (!quiz) {
      const quizNotExistsError = new Error('Quiz não encontrado!');
      quizNotExistsError.status = 404;
      throw quizNotExistsError;
    }

    let question = await this.questionRepository.findByPk(id);
    const score = await getScoreBasedOnDifficulty(difficultyLevel);

    if (!question) {
      try {
        question = await this.questionRepository.create({
          copy,
          available_on_questions_db: availableOnQuestionsDB,
          title,
          timer,
          difficulty_level: difficultyLevel,
          quiz_id,
          id_image,
          type,
          index,
          score,
          image_base64: imageBase64,
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
      question.difficulty_level = difficultyLevel;
      question.copy = copy;
      question.type = type;
      question.score = score;
      question.image_base64 = imageBase64;
      question.available_on_questions_db = availableOnQuestionsDB;
      if (id_image) question.id_image = id_image;
      question.save();
    }

    // ATUALIZANDO OU CRIANDO AS QUESTÕES
    const id_question = question.id;
    const answerRepository = new AnswerRepository();

    // eslint-disable-next-line consistent-return
    answer.map(async (answerItem) => {
      const answerFounded = await answerRepository.findById(answerItem.id);
      if (!answerFounded) {
        try {
          await answerRepository.create({
            id_question,
            title: answerItem.title,
            is_correct: answerItem.is_correct,
          });
        } catch (error) {
          const createAnswerError = new Error(error);
          createAnswerError.status = 500;
          throw createAnswerError;
        }
      } else {
        answerFounded.title = answerItem.title;
        answerFounded.is_correct = answerItem.is_correct;
        answerFounded.save();
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
    const tagsAlreadyInQuestion = await question.getTags_question();
    const arrayTagsAlreadyInQuestion = tagsAlreadyInQuestion.map(
      (item) => item.name
    );

    tags.map(async (tagObject) => {
      const tagService = new TagService();
      const [tag] = await tagService.findOrCreate({
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
  }

  async index() {
    const questions = this.questionRepository.findAll({
      include: [
        {
          model: Answer,
          as: 'answer',
          attributes: ['id', 'title', 'is_correct'],
        },
        // {
        //   model: File,
        //   as: 'image_question',
        //   attributes: ['url', 'path', 'name'],
        // },
        {
          model: Tag,
          as: 'tags_question',
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
        available_on_questions_db: true,
      },
      include: [
        {
          model: Answer,
          as: 'answer',
          attributes: ['id', 'title', 'is_correct'],
        },
        // {
        //   model: File,
        //   as: 'image_question',
        //   attributes: ['url', 'path', 'name'],
        // },
        {
          model: Tag,
          as: 'tags_question',
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

    // const { id_image } = question;

    // const file = await File.findByPk(id_image);

    // if (file) file.destroy();

    const answers = await question.getAnswer();
    const tags = await question.getTags_question();

    answers.map((item) => item.destroy());
    tags.map((item) => question.removeTags_question(item));
    question.destroy();

    return question;
  }
}

export default QuestionService;
