import GetClassesFromStudentService from '../../services/Student/GetClassesFromStudent';

class ClassesOfStudentController {
  async index(req, res) {
    try {
      const { idStudent } = req.params;
      const classes = await GetClassesFromStudentService.execute({ idStudent });

      return res.status(200).json(classes);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassesOfStudentController();
