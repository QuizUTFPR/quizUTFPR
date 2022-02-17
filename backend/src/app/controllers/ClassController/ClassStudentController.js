// SERVICES
import AddStudentToClassService from '../../services/Class/ClassStudent/AddStudentToClass';
import DeleteStudentFromClassService from '../../services/Class/ClassStudent/DeleteStudentFromClass';
import GetAllStudentsFromClassService from '../../services/Class/ClassStudent/GetAllStudentsFromClass';

class ClassStudentConstroller {
  async store(req, res) {
    try {
      const classInstance = await AddStudentToClassService.execute(req.body);

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
      const quizzes = await GetAllStudentsFromClassService(req.body);

      return res.status(200).json(quizzes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async delete(req, res) {
    try {
      const removedStudent = await DeleteStudentFromClassService.execute(
        req.body
      );

      return res.status(200).json(removedStudent);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassStudentConstroller();
