// SERVICES
import CreateClassService from '../../services/Class/CreateClass';
import FindByPkClassService from '../../services/Class/FindByPkClass';
import DeleteClassService from '../../services/Class/DeleteClass';
import UpdateClassService from '../../services/Class/UpdateClass';
import GetAllClasses from '../../services/Class/GetAllClasses';

class ClassController {
  async store(req, res) {
    try {
      const idTeacher = req.userId;
      const { idImage } = req;

      const { values } = req.body;

      const { title, description, visibility } = JSON.parse(values);

      const classCreated = await CreateClassService.execute({
        title,
        description,
        idTeacher,
        idImage,
        visibility,
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

  async index(req, res) {
    try {
      const allClasses = await GetAllClasses.execute();

      return res.status(200).json(allClasses);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async show(req, res) {
    try {
      const { id } = req.body;

      const classSearched = await FindByPkClassService.execute({ id });

      return res.status(200).json(classSearched);
    } catch (error) {
      console.log(error);
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.body;

      await DeleteClassService.execute({ id });

      return res.status(200).json();
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async update(req, res) {
    try {
      const { values } = req.body;
      const { id, title, description } = JSON.parse(values);
      const { idImage } = req;

      const updatedClass = await UpdateClassService.execute({
        id,
        idImage,
        title,
        description,
      });

      return res.status(200).json(updatedClass);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassController();
