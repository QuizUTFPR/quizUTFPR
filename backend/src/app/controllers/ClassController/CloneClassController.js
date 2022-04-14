// SERVICES
import CreateCloneClassService from '../../services/Class/CreateCloneClass';

class CloneClassController {
  async store(req, res) {
    try {
      const idTeacher = req.userId;
      const { values } = req.body;
      const { idClass, title, description, visibility } = JSON.parse(values);
      const { idImage } = req;

      const classCreated = await CreateCloneClassService.execute({
        idTeacher,
        idClass,
        idImage,
        title,
        description,
        visibility,
      });

      return res.status(200).json(classCreated);
    } catch (error) {
      console.log('error', error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new CloneClassController();
