import GetAvailableClassesService from '../../services/Class/ClassStudent/GetAvailableClasses';

class AvailableClassesController {
  async index(req, res) {
    try {
      const { idClass, studentId } = req.params;

      const availableClasses = GetAvailableClassesService.execute({
        idClass,
        studentId,
      });

      return res.status(200).json(availableClasses);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new AvailableClassesController();
