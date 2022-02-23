// SERVICES
import GetAllAvailableQuizzesService from '../../services/Class/ClassQuiz/GetAllAvailableQuizzes';

class AvailableQuizzesController {
  async index(req, res) {
    try {
      const { idClass } = req.body;
      const idTeacher = req.userId;

      const availableQuizzes = await GetAllAvailableQuizzesService.execute({
        idClass,
        idTeacher,
      });

      return res.status(200).json(availableQuizzes);
    } catch (error) {
      console.log(error);
      return (
        (error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new AvailableQuizzesController();
