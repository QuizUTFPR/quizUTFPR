import * as Yup from "yup";

// MODELS
import StudentQuestionChoice from "../../models/StudentQuestionChoice";
import StudentQuiz from "../../models/StudentQuiz";
import Student from "../../models/StudentModel";

import getMethod from '../../utils/getMethodsOfAssociation'
class StudentQuestionChoiceController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        student_quiz_id: Yup.number("ID da tentativa inválido!").required(
          "Por favor, informe o ID da tentativa!"
        ),
        question_id: Yup.number("ID da questão inválido!").required(
          "Por favor, informe o id da questão"
        ),
        quiz_id: Yup.number("id do quiz inválido!").required(
          "Por favor, informe o ID da questão"
        ),
        time_left: Yup.number("O tempo restão é invalido!").required(
          "Por favor, informe um tempo restante"
        ),
        arrayOfChecked: Yup.array(
          Yup.bool("Os valores devem ser booleanos")
        ).required("Por favor, informe o array de checagem das questões!")
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Falha na validação!" });
      }

      const student_id = req.userId;
      const { 
        question_id, 
        student_quiz_id, 
        arrayOfChecked, 
        quiz_id, 
        time_left 
      } = req.body;
      
      const checked1 = arrayOfChecked[0];
      const checked2 = arrayOfChecked[1];
      const checked3 = arrayOfChecked[2];
      const checked4 = arrayOfChecked[3];

      const studentQuestionChoice = await StudentQuestionChoice.create({
        quiz_id,
        student_id,
        question_id,
        student_quiz_id,
        time_left,
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
}

export default new StudentQuestionChoiceController();
