import GetAvailableStudentClassesService from '../../services/Class/ClassStudent/GetAvailableStudentClasses';

class AvailableStudentClassesController {
  async index(req, res) {
    try {
      const studentId = req.userId;

      console.log('studentId', studentId);

      const availableClasses = await GetAvailableStudentClassesService.execute({
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
