// SERVICES
import CreateClassService from '../../services/Class/CreateClass';

class StudentController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const { title, description } = req.body;
      const idTeacher = req.userId;
      const { idImage } = req;

      const classCreated = await CreateClassService.execute({
        title,
        description,
        idTeacher,
        idImage,
      });

      return res.status(200).json(classCreated);
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
