// SERVICES
import QuizTeacherService from '../../services/Quiz/QuizTeacher';

class QuizTeacherController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const id_teacher = req.userId;

      const quizTeacherService = new QuizTeacherService();
      const quizzes = await quizTeacherService.execute(id_teacher);

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new QuizTeacherController();
