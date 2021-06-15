import * as Yup from "yup";

// MODELS
import StudentQuizFinishedAttempt from "../../models/StudentQuizFinishedAttempt";
import StudentQuestionChoice from "../../models/StudentQuestionChoice";

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
      let hit_amount = 0;
      const score = 30;
      const attempt = await StudentQuizFinishedAttempt.count({
        where: { student_id, quiz_id }
      });


      // Get all choices of a specific student attempt of answering the quiz
      const choices = await StudentQuestionChoice.findAll({
        where: { attempt, student_id, quiz_id }
      });

      
      // Getting how many questions did the student checked right
      await Promise.all(choices.map(async(item) => {
        const checkedChoices = [item.checked1, item.checked2, item.checked3, item.checked4]
        const question = await item.getQuestion();
        const answer = await question.getAnswer()
        answer.map((answerItem, i) => {
          if(answerItem.is_correct && checkedChoices[i]){
            hit_amount += 1;
          }
        })
      })).then(async () => {
        const finished = await StudentQuizFinishedAttempt.create({
          student_id,
          quiz_id,
          hit_amount,
          score,
          attempt
        });
        
        return res.status(200).json(finished);
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizFinishedAttemptController();
