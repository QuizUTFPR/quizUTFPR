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
        quizId: Yup.string('ID do quiz inválido!').required(
          'Por favor, informe o id do quiz'
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      const studentId = req.userId;

      const { quizId } = req.body;

      const finished = await StudentQuiz.create({
        studentId,
        quizId,
        hitAmount: 0,
        score: 0,
        isFinished: false,
      });

      return res.status(200).json(finished);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        idStudentQuiz: Yup.number('ID da tentativa inválido!').required(
          'Por favor, informe o ID da tentativa de resposta do aluno ao quiz!'
        ),
        quizId: Yup.string('ID do quiz inválido!').required(
          'Por favor, informe o id do quiz'
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Falha na validação!' });
      }

      const studentId = req.userId;

      const { quizId, idStudentQuiz } = req.body;

      const quiz = await Quiz.findByPk(quizId);
      const questionQuiz = await quiz.getQuestions();
      const idQuestionsAnswered = (
        await quiz.getQuizStudentChoice({
          where: {
            studentQuizId: idStudentQuiz,
          },
        })
      ).map((item) => item.questionId);

      const questionNotAnswered = questionQuiz.filter(
        (question) => !idQuestionsAnswered.includes(question.id)
      );

      // CASO EXISTA QUESTÕES NÃO RESPONDIDAS, EU CADASTO AS MESMAS SEM MARCAR NENHUM ALTERNATIVA
      await Promise.all(
        questionNotAnswered.map(async (question) => {
          await StudentQuestionChoice.create({
            questionId: question.id,
            studentId,
            quizId,
            studentQuizId: idStudentQuiz,
          });
        })
      );

      const studentQuiz = await StudentQuiz.findByPk(idStudentQuiz);
      const studentChoices = await studentQuiz.getQuizQuestionChoice();

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
            (element) => element.id === item.questionId
          );
          const answers = await question.getAnswer({ order: [['id', 'ASC']] });

          let hasWrongChoice = false;
          // eslint-disable-next-line array-callback-return
          answers.map((itemAnswers, index) => {
            if (itemAnswers.isCorrect) {
              correctAnswerAmount += 1;
            }

            if (!itemAnswers.isCorrect && studentAnswers[index]) {
              hasWrongChoice = true;
              studentAnswerCorrect = 0;
            }

            if (
              itemAnswers.isCorrect &&
              studentAnswers[index] &&
              !hasWrongChoice
            ) {
              studentAnswerCorrect += 1;
            }
          });

          if (studentAnswerCorrect > 0) {
            studentAmountQuestionCorrect += 1;
          }

          const { noTime } = quiz;
          const questionScore = question.score;
          const timeOfQuestion = question.timer;
          const { timeLeft } = item;
          const bonus = noTime ? 1 : (timeLeft / timeOfQuestion) * (50 / 100);

          score += questionScore + questionScore * bonus;
          final += (1 / correctAnswerAmount) * studentAnswerCorrect * score;
        })
      );

      const studentQuizUpdated = await StudentQuiz.findByPk(idStudentQuiz);

      if (!studentQuizUpdated)
        return res
          .status(404)
          .json({ error: 'Nenhuma tentativa de resposta de quiz encontrado.' });

      studentQuizUpdated.score = final;
      studentQuizUpdated.hitAmount = studentAmountQuestionCorrect;
      studentQuizUpdated.isFinished = true;
      await studentQuizUpdated.save();

      if (!studentQuizUpdated)
        return res
          .status(404)
          .json({ error: 'Nenhuma tentativa de resposta de quiz encontrado.' });

      studentQuizUpdated.score = final;
      studentQuizUpdated.hitAmount = studentAnswerCorrect;
      studentQuizUpdated.isFinished = true;
      await studentQuizUpdated.save();

      return res.status(200).json(studentQuizUpdated);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StudentQuizController();
