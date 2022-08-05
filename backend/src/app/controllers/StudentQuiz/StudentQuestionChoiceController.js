// SERVICES
import StudentQuestionChoiceService from '../../services/StudentQuiz/StudentQuestionChoice';

class StudentQuestionChoiceController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const studentQuestionChoice = await StudentQuestionChoiceService.execute(
        req
      );

      return res.status(200).json(studentQuestionChoice);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new StudentQuestionChoiceController();
