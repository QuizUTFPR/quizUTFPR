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
    } catch (err) {
      if (err.response.status === 401) {
        return res
          .status(403)
          .json({ error: 'Dados de usuário ou senha incorretos' });
      }

      return res.status(500).json(err);
    }
  }
}

export default new SessionTeacherController();
