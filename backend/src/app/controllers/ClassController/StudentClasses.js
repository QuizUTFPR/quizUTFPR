// SERVICES
import GetAllStudentClassesService from '../../services/Class/ClassStudent/GetAllStudentClasses';

class StudentClassesController {
  async index(req, res) {
    try {
      const studentId = req.userId;

      const studentClasses = await GetAllStudentClassesService.execute({
        studentId,
      });

      return res.status(200).json(studentClasses);
    } catch (error) {
      console.log('STUDENT CLASSES ERROR', error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentClassesController();
