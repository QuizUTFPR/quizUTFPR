// SERVICES
import CreateClassService from '../../services/Class/CreateClass';
import FindByPkClassService from '../../services/Class/FindByPkClass';
import GetAllClassesService from '../../services/Class/GetAllClasses';
import DeleteClassService from '../../services/Class/DeleteClass';
import UpdateClassService from '../../services/Class/UpdateClass';

class ClassController {
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
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async index(req, res) {
    try {
      const allClasses = await GetAllClassesService.execute();

      return res.status(200).json(allClasses);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.body;

      const deletedClass = await DeleteClassService.execute({ id });

      return res.status(200).json(deletedClass);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }

  async update(req, res) {
    try {
      const { id, ...values } = req.body;

      const updatedClass = await UpdateClassService.execute(
        { ...values },
        { id }
      );

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
