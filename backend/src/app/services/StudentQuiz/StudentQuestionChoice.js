import * as Yup from 'yup';

// MODELS
import StudentQuestionChoiceRepository from '../../repositories/StudentQuestionChoice';

class StudentQuestionChoiceService {
  constructor() {
    this.studentQuestionChoiceRepository =
      new StudentQuestionChoiceRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      studentQuizId: Yup.number('ID da tentativa inválido!').required(
        'Por favor, informe o ID da tentativa!'
      ),
      questionId: Yup.number('ID da questão inválido!').required(
        'Por favor, informe o id da questão'
      ),
      quizId: Yup.string('id do quiz inválido!').required(
        'Por favor, informe o ID da questão'
      ),
      timeLeft: Yup.number('O tempo restão é invalido!').required(
        'Por favor, informe um tempo restante'
      ),
      arrayOfChecked: Yup.array(
        Yup.bool('Os valores devem ser booleanos')
      ).required('Por favor, informe o array de checagem das questões!'),
    });

    if (!(await schema.isValid(data.body))) {
      const error = new Error();
      error.status = 400;
      error.response = 'Falha na validação!';
      throw error;
    }

    const studentId = data.userId;
    const { questionId, studentQuizId, arrayOfChecked, quizId, timeLeft } =
      data.body;

    const checked1 = arrayOfChecked[0];
    const checked2 = arrayOfChecked[1];
    const checked3 = arrayOfChecked[2];
    const checked4 = arrayOfChecked[3];

    const studentQuestionChoice =
      await this.studentQuestionChoiceRepository.create({
        quizId,
        studentId,
        questionId,
        studentQuizId,
        timeLeft,
        checked1,
        checked2,
        checked3,
        checked4,
      });

    return studentQuestionChoice;
  }
}

export default new StudentQuestionChoiceService();
