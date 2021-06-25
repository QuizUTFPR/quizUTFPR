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
        quiz_id: Yup.number("ID do quiz inválido!").required(
          "Por favor, informe o id do quiz"
        )
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Falha na validação!" });
      }

      const student_id = req.userId;

      const { quiz_id } = req.body;
      
      console.log(quiz_id, student_id)

      const finished = await StudentQuiz.create({
        student_id,
        quiz_id,
        hit_amount: 0,
        score: 0,
        is_finished: false,
      });

      console.log(finished)
      
      return res.status(200).json(finished);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req, res){
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

      const student_id = req.userId;

      const { quiz_id, id_student_quiz } = req.body;

      const quiz = await Quiz.findByPk(quiz_id);
      const questionQuiz = await quiz.getQuestions();
      const idQuestionsAnswered = (await quiz.getQuiz_student_choice()).map(item => item.question_id);
      const questionNotAnswered = questionQuiz.filter(question => !idQuestionsAnswered.includes(question.id));
      
      // CASO EXISTA QUESTÕES NÃO RESPONDIDAS, EU CADASTO AS MESMAS SEM MARCAR NENHUM ALTERNATIVA
      await Promise.all(questionNotAnswered.map(async question => {
        await StudentQuestionChoice.create({
          question_id: question.id,
          student_id, 
          quiz_id, 
          student_quiz_id: id_student_quiz,
        })
      }))
      
      const studentQuiz = await StudentQuiz.findByPk(id_student_quiz);
      const studentChoices = await studentQuiz.getQuiz_question_choice();

      //CALCULANDO SCORE
      let score = 0;
      let correctAnswerAmount = 0;
      let studentAnswerCorrect = 0;
      await Promise.all(studentChoices.map(async item => {
        const studentAnswers = [item.checked1, item.checked2, item.checked3, item.checked4];
        console.log(studentAnswers)
        const question = (questionQuiz.find(element => element.id === item.question_id));
        const answers = await question.getAnswer();
        
        answers.map((item, index) => {
          if(item.is_correct){
            correctAnswerAmount++;
          }

          if(item.is_correct && studentAnswers[index]){
            studentAnswerCorrect++
          }
        });

        const questionScore = question.score;
        const timeOfQuestion = question.timer;
        const timeLeft = item.time_left;
        
        const bonus = (timeLeft/timeOfQuestion) * (50/100)
        score += questionScore + questionScore * bonus;
      }))

      console.log(1/correctAnswerAmount, studentAnswerCorrect, score)
      const final = (1/correctAnswerAmount) * studentAnswerCorrect * score;
      
      console.log(final)

      const studentQuizUpdated = await StudentQuiz.findByPk(id_student_quiz)

      if(!studentQuizUpdated)
        return res.status(404).json({error: "Nenhuma tentativa de resposta de quiz encontrado."});

      studentQuizUpdated.score= final;
      studentQuizUpdated.hit_amount= studentAnswerCorrect;
      studentQuizUpdated.is_finished= true;
      studentQuizUpdated.save();


      return res.status(200).json(studentQuizUpdated);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}



export default new StudentQuizController();
