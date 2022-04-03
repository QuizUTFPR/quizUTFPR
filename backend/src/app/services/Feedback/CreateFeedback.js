import * as Yup from 'yup';

// REPOSITORIES
import FeedbackRepository from '../../repositories/Feedback';

class CreateRefreshTokenService {
  constructor() {
    this.feedbackRepository = new FeedbackRepository();
  }

  async execute(data) {
    const schema = Yup.object().shape({
      message: Yup.string('Tipo de contéudo de mensagem inválido').required(
        'Por favor, informe uma mensagem de feedback.'
      ),
      studentId: Yup.number('Tipo de ID do estudante inválido').required(
        'Por favor, informe o ID do estudante'
      ),
    });

    const validation = await schema.validate(data);

    if (!validation) {
      const error = new Error();
      error.status = 400;
      error.response = validation;
      throw error;
    }

    const { message, studentId } = data;

    const feedback = await this.feedbackRepository.create({
      message,
      studentId,
    });

    return feedback;
  }
}

export default new CreateRefreshTokenService();
