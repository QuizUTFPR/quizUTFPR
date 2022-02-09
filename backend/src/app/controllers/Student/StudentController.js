// SERVICES
import CreateStudentService from '../../services/Student/CreateStudent';

class StudentController {
  // Cadastra um único registro
  async store(req, res) {
    const { name, email, password } = req.body;
    try {
      const studentService = new CreateStudentService();
      const student = await studentService.execute({
        name,
        email,
        password,
      });

      return res.status(200).json(student);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentController();
