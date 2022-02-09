// SERVICES
import StudentSessionService from '../../services/Student/StudentSession';

class SessionStudentController {
  // Cadastra um único registro
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const studentSessionService = new StudentSessionService();
      const student = await studentSessionService.execute({
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

export default new SessionStudentController();
