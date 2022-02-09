import crc32 from 'fast-crc32c';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

dayjs.extend(utc);

class PublishQuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async execute(id) {
    const pin = crc32.calculate(toString(id), id);

    const quiz = await this.quizRepository.findByPk(id);

    if (!quiz) {
      const error = new Error('Nenhum quiz encontrado.');
      error.status = 404;
      throw error;
    }

    const countQuestion = await quiz.countQuestions();

    if (countQuestion < 1) {
      const error = new Error('Nenhuma questão cadastrada no quiz.');
      error.status = 404;
      throw error;
    }

    quiz.published = true;
    quiz.pin = pin;
    quiz.publishDate = dayjs.utc().format();
    quiz.save();
  }
}

export default PublishQuizService;
