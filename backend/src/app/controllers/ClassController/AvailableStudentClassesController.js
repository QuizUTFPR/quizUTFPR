import GetAvailableStudentClassesService from '../../services/Class/ClassStudent/GetAvailableStudentClasses';

class AvailableStudentClassesController {
  async index(req, res) {
    try {
      const { idClass, studentId } = req.params;

      const availableClasses = GetAvailableStudentClassesService.execute({
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

export default new AvailableStudentClassesController();
