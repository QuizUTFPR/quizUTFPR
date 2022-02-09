import * as Yup from 'yup';

// MODELS
import Question from '../../models/QuestionModel';
import Answer from '../../models/AnswerModel';
import Quiz from '../../models/QuizModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import AnswerRepository from '../../repositories/Answer';

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

class QuestionController {
  async store(req, res) {
    try {
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
        imageBase64: Yup.string(),
      });

      const { values } = req.body;
      const { idImage } = req;
      const parsedValues = JSON.parse(values);
      const data = { ...parsedValues, idImage };

      // Check body of requisiton
      if (!(await schema.isValid(data)))
        return res.status(400).json({ error: 'Falha na validação!' });

      const {
        id,
        copy,
        availableOnQuestionsDB: availableOnQuestionsDb,
        title,
        timer,
        difficultyLevel,
        quizId,
        answer,
        tags,
        type,
        index,
        imageBase64,
      } = data;

      const quiz = await Quiz.findByPk(quizId);

      if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado!' });

      let question = await Question.findByPk(id);
      const score = await getScoreBasedOnDifficulty(difficultyLevel);
      if (!question) {
        // CASO QUESTÃO NÃO EXISTIR CRIO A MESMA E AS ALTERNATIVAS
        try {
          question = await Question.create({
            copy,
            availableOnQuestionsDb,
            title,
            timer,
            difficultyLevel,
            quizId,
            idImage,
            type,
            index,
            score,
            imageBase64,
          });
        } catch (error) {
          return res.status(500).json(error);
        }
      } else {
        // CASO QUESTÃO JÁ EXISTA REALIZO AS ALTERAÇÕES AQUI
        question.title = title;
        question.index = index;
        question.timer = timer;
        question.difficultyLevel = difficultyLevel;
        question.copy = copy;
        question.type = type;
        question.score = score;
        question.imageBase64 = imageBase64;
        question.availableOnQuestionsDb = availableOnQuestionsDb;
        question.idImage = idImage || quiz.idImage;
        question.save();
      }

      // ATUALIZANDO OU CRIANDO AS QUESTÕES
      const idQuestion = question.id;
      const answerRepository = new AnswerRepository();

      // eslint-disable-next-line consistent-return
      answer.map(async (answerItem) => {
        const answerFounded = await answerRepository.findById(answerItem.id);
        if (!answerFounded) {
          try {
            await answerRepository.create({
              idQuestion,
              title: answerItem.title,
              isCorrect: answerItem.isCorrect,
            });
          } catch (error) {
            return res.status(500).json(error);
          }
        } else {
          answerFounded.title = answerItem.title;
          answerFounded.isCorrect = answerItem.isCorrect;
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
        const [tag] = await Tag.findOrCreate({
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

      return res.status(200).json(question);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // Lista todos os registros
  async index(req, res) {
    try {
      const questions = await Question.findAll({
        attributes: [
          'id',
          'index',
          'title',
          'timer',
          'difficultyLevel',
          'copy',
          'availableOnQuestionsDb',
          'type',
          'score',
          'imageBase64',
          'idImage',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'isCorrect'],
          },
          {
            model: File,
            as: 'image_question',
            attributes: ['url', 'path', 'name'],
          },
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

      if (!questions.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhuma questão cadastrada.' });

      return res.status(200).json(questions);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // Exibe um único registro
  async show(req, res) {
    try {
      const { tag } = req.params;

      const questions = await Question.findAll({
        where: {
          availableOnQuestionsDb: true,
        },
        attributes: [
          'id',
          'title',
          'timer',
          'difficultyLevel',
          'type',
          'score',
          'imageBase64',
          'idImage',
        ],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'isCorrect'],
          },
          {
            model: File,
            as: 'image_question',
            attributes: ['url', 'path', 'name'],
          },
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

      if (!questions.length)
        return res
          .status(404)
          .json({ error: 'Não existe nenhuma questão cadastrada.' });

      return res.status(200).json(questions);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // Remove um único registro
  async delete(req, res) {
    try {
      const { id } = req.body;

      const question = await Question.findByPk(id);

      if (!question)
        return res.status(404).json({ error: 'Questão não encontrada!' });

      const answers = await question.getAnswer();
      const tags = await question.getTags_question();

      answers.map((item) => item.destroy());
      tags.map((item) => question.removeTags_question(item));
      question.destroy();

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new QuestionController();
