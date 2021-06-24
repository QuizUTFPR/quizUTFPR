import * as Yup from "yup";

// MODELS
import StudentQuiz from "../../models/StudentQuiz";
import StudentQuestionChoice from "../../models/StudentQuestionChoice";
import Quiz from "../../models/QuizModel"

import getMethod from "../../utils/getMethodsOfAssociation";

class StudentQuizController {
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
      

      const finished = await StudentQuiz.create({
        student_id,
        quiz_id,
        hit_amount: 0,
        score: 0,
        is_finished: false,
      });
      
      return res.status(200).json(finished);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizController();
