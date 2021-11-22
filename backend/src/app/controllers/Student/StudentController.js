// SERVICES
import CreateStudentService from '../../services/Student/CreateStudent';

class StudentController {
  // Cadastra um único registro
  // async store(req, res) {
  //   try {
  //     const schema = Yup.object().shape({
  //       name: Yup.string().required(),
  //       email: Yup.string().email().required(),
  //       password: Yup.string().required(),
  //     });
  //     if (!(await schema.isValid(req.body))) {
  //       return res.status(400).json({ error: 'Falha na validação!' });
  //     }
  //     const { email, password, name } = req.body;
  //     const student = await Student.create({
  //       name,
  //       email,
  //       password,
  //     });
  //     const { id } = student;
  //     // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
  //     await RefreshToken.destroy({
  //       where: { user_id: id },
  //     });
  //     const token = await GenerateTokenProvider.execute(id);
  //     const refreshToken = await GenerateRefreshTokenProvider.execute(id);
  //     return res.json({
  //       student: {
  //         email,
  //         name,
  //       },
  //       token,
  //       refresh_token: refreshToken.id,
  //     });
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // }

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
