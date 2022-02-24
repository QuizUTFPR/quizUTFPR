class ClassesOfStudentController {
  async index(req, res) {
    try {
      const { idClass, idStudent } = req.body;
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new ClassesOfStudentController();
