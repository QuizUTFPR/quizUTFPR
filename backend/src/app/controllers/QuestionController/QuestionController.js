// SERVICES
import QuestionService from '../../services/Question';

class QuestionController {
  async store(req, res) {
    try {
      const { values } = req.body;
      const { idImage } = req;
      const parsedValues = JSON.parse(values);
      const data = { ...parsedValues, idImage };

      const question = await QuestionService.createQuestion(data);

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
      const questions = await QuestionService.index();

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

      const questions = await QuestionService.show({ tag });

      return res.status(200).json(questions);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;
      const question = await QuestionService.delete({ id });

      return res.status(200).json(question);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuestionController();
