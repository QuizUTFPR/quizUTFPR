// SERVICES
import AddQuizToClassService from '../../services/Class/ClassQuiz/AddQuizToClass';
import GetAllQuizzesFromClassService from '../../services/Class/ClassQuiz/GetAllQuizzesFromClass';
import DeleteQuizFromClassService from '../../services/Class/ClassQuiz/DeleteQuizFromClass';

class ClassQuizController {
  async store(req, res) {
    try {
      const { idClass, idQuiz } = req.body;

      const classInstance = await AddQuizToClassService.execute({
        idClass,
        idQuiz,
      });

      return res.status(200).json(classInstance);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async index(req, res) {
    try {
      const { idClass } = req.params;
      const idStudent = req.userId;

      const quizzesFromClass = await GetAllQuizzesFromClassService.execute({
        idClass,
        idStudent,
      });

      return res.status(200).json(quizzesFromClass);
    } catch (error) {
      console.log('error', error);

      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async delete(req, res) {
    try {
      const { idClass, idQuiz } = req.body;
      const removedQuiz = await DeleteQuizFromClassService.execute({
        idClass,
        idQuiz,
      });

      return res.status(200).json(removedQuiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassQuizController();
