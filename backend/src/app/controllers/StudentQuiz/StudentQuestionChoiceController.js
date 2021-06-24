import * as Yup from "yup";

// MODELS
import StudentQuestionChoice from "../../models/StudentQuestionChoice";
import StudentQuizFinishedAttempt from "../../models/StudentQuizFinishedAttempt";
import Student from "../../models/StudentModel";

class StudentQuestionChoiceController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        student_id: Yup.number("ID do estudante inválido!").required(
          "Por favor, informe o ID do estudante"
        ),
        question_id: Yup.number("ID da questão inválido!").required(
          "Por favor, informe o id da questão"
        ),
        quiz_id: Yup.number("id do quiz inválido!").required(
          "Por favor, informe o ID da questão"
        ),
        arrayOfChecked: Yup.array(
          Yup.bool("Os valores devem ser booleanos")
        ).required("Por favor, informe o array de checagem das questões!")
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Falha na validação!" });
      }

      const { student_id, question_id, arrayOfChecked, quiz_id } = req.body;
      const checked1 = arrayOfChecked[0];
      const checked2 = arrayOfChecked[1];
      const checked3 = arrayOfChecked[2];
      const checked4 = arrayOfChecked[3];
      const attempt = await StudentQuestionChoice.count({
        where: { student_id: student_id, question_id: question_id }
      });

      const studentQuestionChoice = await StudentQuestionChoice.create({
        quiz_id,
        student_id,
        question_id,
        attempt,
        checked1,
        checked2,
        checked3,
        checked4
      });

      return res.status(200).json(studentQuestionChoice);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async index(req, res) {
    try {
      const student_id = req.userId;
      const { quiz_id } = req.body;
      const attempt = await StudentQuizFinishedAttempt.count({
        where: { student_id, quiz_id }
      });

      const AllQuestionFromAttempt = await StudentQuestionChoice.findAll({
        where: {
          student_id, quiz_id, attempt
        }
      })

      return res.status(200).json(AllQuestionFromAttempt);
    } catch (err) {
      return res.status(500).json(err);

    }
  }
}

export default new StudentQuestionChoiceController();
