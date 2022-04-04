import * as Yup from 'yup';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import StudentQuestionChoiceRepository from '../../repositories/StudentQuestionChoice';
import StudentQuizRepository from '../../repositories/StudentQuiz';

// SERVICES
import CreateOrUpdateStudentQuizRanking from '../Ranking/CreateOrUpdateStudentQuizRanking';

class UpdateStudentQuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.studentQuestionChoiceRepository =
      new StudentQuestionChoiceRepository();
    this.studentQuizRepository = new StudentQuizRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      idStudentQuiz: Yup.number('ID da tentativa inválido!').required(
        'Por favor, informe o ID da tentativa de resposta do aluno ao quiz!'
      ),
      quizId: Yup.string('ID do quiz inválido!').required(
        'Por favor, informe o id do quiz'
      ),
    });

    if (!(await schema.isValid(data.body))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    const studentId = data.userId;
    const { quizId, idStudentQuiz } = data.body;

    const quiz = await this.quizRepository.findByPk(quizId);

    if (!quiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'Quiz inexistente!';
      throw error;
    }

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
        await this.studentQuestionChoice.create({
          questionId: question.id,
          studentId,
          quizId,
          studentQuizId: idStudentQuiz,
        });
      })
    );

    const studentQuiz = await this.studentQuizRepository.findByPk(
      idStudentQuiz
    );
    const studentChoices = await studentQuiz.getQuizQuestionChoice();

    // CALCULANDO SCORE
    let score = 0;
    let correctAnswerAmount = 1;
    let studentAnswerCorrect = 0;
    let studentAmountQuestionCorrect = 0;
    let finalScore = 0;
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
        const answers = await question.getAnswer({
          order: [['id', 'ASC']],
        });

        let hasWrongChoice = false;
        answers.forEach((itemAnswers, index) => {
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
        finalScore += (1 / correctAnswerAmount) * studentAnswerCorrect * score;
      })
    );

    const studentQuizUpdated = await this.studentQuizRepository.findByPk(
      idStudentQuiz
    );

    if (!studentQuizUpdated) {
      const error = new Error();
      error.status = 404;
      error.response = 'Nenhuma tentativa de resposta de quiz encontrado.';
      throw error;
    }

    studentQuizUpdated.score = finalScore;
    studentQuizUpdated.hitAmount = studentAmountQuestionCorrect;
    studentQuizUpdated.isFinished = true;
    await studentQuizUpdated.save();

    // Update ranking position of student
    await CreateOrUpdateStudentQuizRanking.execute({
      studentId,
      quizId,
      newStudentQuizId: idStudentQuiz,
      newScore: finalScore,
      classId: studentQuizUpdated.classId,
    });

    return studentQuizUpdated;
  }
}

export default new UpdateStudentQuizService();
