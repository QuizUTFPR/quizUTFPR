// SERVICES
import GetAllClassesService from '../../services/Class/GetAllTeacherClasses';

// MODELS
import File from '../../models/FileModel';

class ClassTeacherController {
  async index(req, res) {
    try {
      const idTeacher = req.userId;

      const allTeacherClasses = await GetAllClassesService.execute({
        where: {
          idTeacher,
        },
        include: [
          {
            model: File,
            as: 'imageClass',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.status(200).json(allTeacherClasses);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassTeacherController();
