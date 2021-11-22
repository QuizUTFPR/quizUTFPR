// SERVICES
import StudentSessionService from '../../services/Student/StudentSession';

class SessionStudentController {
  // Cadastra um único registro
  // async store(req, res) {
  //   try {
  //     const schema = Yup.object().shape({
  //       email: Yup.string().email().required(),
  //       password: Yup.string().required(),
  //     });

  //     // Check body of requisiton
  //     if (!(await schema.isValid(req.body))) {
  //       return res.status(400).json({ error: 'Falha na validação!' });
  //     }

  //     const { email, password } = req.body;

  //     // cadastro estudante caso nao existir no sistema
  //     const student = await Student.findOne({ where: { email } });
  //     if (!student) {
  //       return res.status(403).json({ error: 'E-mail Inválido!' });
  //     }

  //     if (!(await student.checkPassword(password))) {
  //       return res.status(403).json({ error: 'Senha Incorreta!' });
  //     }

  //     const { id, name } = student;

  //     // REMOVE REFRESH TOKENS ANTIGOS SALVOS NO BANCO
  //     await RefreshToken.destroy({
  //       where: { user_id: id },
  //     });

  //     const token = await GenerateTokenProvider.execute(id);
  //     const refreshToken = await GenerateRefreshTokenProvider.execute(id);

  //     return res.status(200).json({
  //       student: {
  //         name,
  //         email,
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
