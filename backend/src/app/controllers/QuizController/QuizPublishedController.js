// MODELS
// import Student from '../../models/StudentModel';
// import Quiz from '../../models/QuizModel';
// import Teacher from '../../models/TeacherModel';
// import Tag from '../../models/TagModel';
// import File from '../../models/FileModel';
// import FavoriteStudentQuiz from '../../models/FavoriteStudentQuiz';

// SERVICES
import QuizPublishedService from '../../services/Quiz/QuizPublished';

class QuizPublishedController {
  // Lista todos os registros
  async index(req, res) {
    try {
      const studentId = req.userId;
      const page = req.body.page || false;
      const limit = req.body.limit || 3;

      const quizPublishedService = new QuizPublishedService();
      const quizzes = await quizPublishedService.execute({
        studentId,
        page,
        limit,
      });

      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new QuizPublishedController();
