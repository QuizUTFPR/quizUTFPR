// import * as Yup from 'yup';

// MODELS
import Question from '../../models/QuestionModel';
// import Answer from '../../models/AnswerModel';
// import Quiz from '../../models/QuizModel';
// import Tag from '../../models/TagModel';
// import File from '../../models/FileModel';

// REPOSITORIES
// import AnswerRepository from '../../repositories/Answer';

// SERVICES
import QuestionService from '../../services/Question';

// async function getScoreBasedOnDifficulty(difficulty) {
//   switch (difficulty) {
//     case 'Muito Fácil':
//       return 5;
//     case 'Fácil':
//       return 10;
//     case 'Médio':
//       return 15;
//     case 'Difícil':
//       return 30;
//     case 'Muito Difícil':
//       return 40;
//     default:
//       return 0;
//   }
// }

class QuestionController {
  async store(req, res) {
    try {
      const { values } = req.body;
      const { idImage } = req;
      const parsedValues = JSON.parse(values);
      const data = { ...parsedValues, idImage };

      const questionService = new QuestionService();
      const question = await questionService.createQuestion(data);

      return res.status(200).json(question);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  // Exibe todos os registros
  async index(req, res) {
    try {
      const questionService = new QuestionService();
      const questions = questionService.index();

      return res.status(200).json(questions);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async show(req, res) {
    try {
      const { tag } = req.params;
      const questionService = new QuestionService();

      const questions = questionService.show({ tag });

      return res.status(200).json(questions);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
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
      const tags = await question.getTagsQuestion();

      answers.map((item) => item.destroy());
      tags.map((item) => question.removeTagsQuestion(item));
      question.destroy();

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new QuestionController();
