// SERVICES
import UpdateStudentService from '../../services/Student/UpdateStudent';
import CreateStudentService from '../../services/Student/CreateStudent';

class StudentController {
  // Cadastra um único registro
  async store(req, res) {
    const { email, name } = req.body;
    console.log(req.body);
    try {
      const student = await CreateStudentService.execute({
        email,
        name,
      });

      return res.status(200).json(student);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async update(req, res) {
    try {
      const { name, id, avatar, isLocalImage } = req.body;

      const student = await UpdateStudentService.execute({
        name,
        id,
        avatar,
        isLocalImage,
      });

      return res.status(200).json(student);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentController();
