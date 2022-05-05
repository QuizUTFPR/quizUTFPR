// SERVICES
import GetAllClassesService from '../../services/Class/GetAllTeacherClasses';

class ClassTeacherController {
  async index(req, res) {
    try {
      const idTeacher = req.userId;
      const { quizId } = req.body;

      const allTeacherClasses = await GetAllClassesService.execute({
        idTeacher,
        quizId,
      });

      return res.status(200).json(allTeacherClasses);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassTeacherController();
