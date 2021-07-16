import * as Yup from 'yup';

// MODELS
import StudentQuiz from '../../models/StudentQuiz';
import StudentQuestionChoice from '../../models/StudentQuestionChoice';
import Quiz from '../../models/QuizModel';

class StudentQuizController {
  // Cadastra um único registro
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        quiz_id: Yup.number('ID do quiz inválido!').required(
          'Por favor, informe o id do quiz'
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      const student_id = req.userId;

      const { quiz_id } = req.body;

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

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        id_student_quiz: Yup.number('ID da tentativa inválido!').required(
          'Por favor, informe o ID da tentativa de resposta do aluno ao quiz!'
        ),
        quiz_id: Yup.number('ID do quiz inválido!').required(
          'Por favor, informe o id do quiz'
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      const student_id = req.userId;

      const { quiz_id, id_student_quiz } = req.body;

      const quiz = await Quiz.findByPk(quiz_id);
      const questionQuiz = await quiz.getQuestions();
      const idQuestionsAnswered = (
        await quiz.getQuiz_student_choice({
          where: {
            student_quiz_id: id_student_quiz,
          },
        })
      ).map((item) => item.question_id);
      const questionNotAnswered = questionQuiz.filter(
        (question) => !idQuestionsAnswered.includes(question.id)
      );


      // CASO EXISTA QUESTÕES NÃO RESPONDIDAS, EU CADASTO AS MESMAS SEM MARCAR NENHUM ALTERNATIVA
      await Promise.all(
        questionNotAnswered.map(async (question) => {
          await StudentQuestionChoice.create({
            question_id: question.id,
            student_id,
            quiz_id,
            student_quiz_id: id_student_quiz,
          });
        })
      );

      const studentQuiz = await StudentQuiz.findByPk(id_student_quiz);
      const studentChoices = await studentQuiz.getQuiz_question_choice();

      // CALCULANDO SCORE
      let score = 0;
      let correctAnswerAmount = 1;
      let studentAnswerCorrect = 0;
      let studentAmountQuestionCorrect = 0;
      let final = 0;
      await Promise.all(
        studentChoices.map(async (item) => {
          const studentAnswers = [
            item.checked1,
            item.checked2,
            item.checked3,
            item.checked4,
          ];
          const question = questionQuiz.find(
            (element) => element.id === item.question_id
          );
          const answers = await question.getAnswer({ order: [['id', 'ASC']] });

          let hasWrongChoice = false;
          // eslint-disable-next-line array-callback-return
          answers.map((itemAnswers, index) => {
            if (itemAnswers.is_correct) {
              correctAnswerAmount += 1;
            }

            if (!itemAnswers.is_correct && studentAnswers[index]) {
              hasWrongChoice = true;
              studentAnswerCorrect = 0;
            }

            if (
              itemAnswers.is_correct &&
              studentAnswers[index] &&
              !hasWrongChoice
            ) {
              studentAnswerCorrect += 1;
            }
          });

          if (studentAnswerCorrect > 0) {
            studentAmountQuestionCorrect += 1;
          }

          const questionScore = question.score;
          const timeOfQuestion = question.timer;
          const timeLeft = item.time_left;
          const bonus = (timeLeft / timeOfQuestion) * (50 / 100);

          score += questionScore + questionScore * bonus;
          final += (1 / correctAnswerAmount) * studentAnswerCorrect * score;
        })
      );

      const studentQuizUpdated = await StudentQuiz.findByPk(id_student_quiz);

      if (!studentQuizUpdated)
        return res
          .status(404)
          .json({ error: 'Nenhuma tentativa de resposta de quiz encontrado.' });

      studentQuizUpdated.score = final;
      studentQuizUpdated.hit_amount = studentAmountQuestionCorrect;
      studentQuizUpdated.is_finished = true;
      studentQuizUpdated.save();

      if (!studentQuizUpdated)
        return res
          .status(404)
          .json({ error: 'Nenhuma tentativa de resposta de quiz encontrado.' });

      studentQuizUpdated.score = final;
      studentQuizUpdated.hit_amount = studentAnswerCorrect;
      studentQuizUpdated.is_finished = true;
      studentQuizUpdated.save();

      return res.status(200).json(studentQuizUpdated);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizController();
