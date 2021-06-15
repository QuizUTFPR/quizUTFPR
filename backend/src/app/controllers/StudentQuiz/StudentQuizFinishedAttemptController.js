import * as Yup from "yup";

// MODELS
import StudentQuizFinishedAttempt from "../../models/StudentQuiz/StudentQuizFinishedAttempt";
import StudentQuestionChoice from "../../models/StudentQuiz/StudentQuizFinishedAttempt";

import getMethod from "../../utils/getMethodsOfAssociation";

class StudentQuizFinishedAttemptController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        student_id: Yup.number("ID do estudante inválido!").required(
          "Por favor, informe o ID do estudante"
        ),
        quiz_id: Yup.number("ID do quiz inválido!").required(
          "Por favor, informe o id do quiz"
        )
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Falha na validação!" });
      }

      const { student_id, quiz_id } = req.body;
      const attempt = await StudentQuizFinishedAttempt.count({
        where: { student_id: student_id, question_id: question_id }
      });

      // Get all choices of a specific choice
      const choices = StudentQuestionChoice.findAll({
        where: { attempt }
      });

      console.log("choices", choices);

      choices.map(item => {
        console.log(getMethod(item));
      });

      const StudentQuizFinishedAttempt = await StudentQuizFinishedAttempt.create(
        {
          student_id,
          quiz_id,
          hit_amount,
          score,
          attempt
        }
      );

      return res.status(200).json(studentQuestionChoice);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizFinishedAttemptController();
