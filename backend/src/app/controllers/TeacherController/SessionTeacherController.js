// SERVICES
import CreateTeacherSessionService from '../../services/Teacher/CreateTeacherSession';

class SessionTeacherController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const teacherSession = await CreateTeacherSessionService.execute(
        req.body
      );

      return res.status(200).json(teacherSession);
    } catch (error) {
      if (error.response.data.status === 401) {
        const RAOrPasswordErrorLdap = new Error();
        RAOrPasswordErrorLdap.status = 403;
        RAOrPasswordErrorLdap.response =
          'Dados de usuário ou senha incorretos!';
        return res.status(403).json(RAOrPasswordErrorLdap);
      }

      return res.status(500).json(error);
    }
  }
}

export default new SessionTeacherController();
