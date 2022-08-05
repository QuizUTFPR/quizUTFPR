import * as Yup from 'yup';

// REPOSITORIES
import StudentQuizRepository from '../../repositories/StudentQuiz';

class CreateStudentQuizService {
  constructor() {
    this.studentQuizRepository = new StudentQuizRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      quizId: Yup.string('Tipo do ID do quiz inválido!').required(
        'Por favor, informe o id do quiz'
      ),
      classId: Yup.string('Tipo do ID da turma inválido!'),
    });

    if (!(await schema.isValid(data.body))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    const studentId = data.userId;
    const { quizId, classId } = data.body;

    const finished = await this.studentQuizRepository.create({
      studentId,
      quizId,
      hitAmount: 0,
      score: 0,
      isFinished: false,
      classId,
    });

    return finished;
  }
}

export default new CreateStudentQuizService();
