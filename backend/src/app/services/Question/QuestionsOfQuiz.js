// MODELS
import Answer from '../../models/AnswerModel';
import File from '../../models/FileModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import QuestionRepository from '../../repositories/Question';
import QuizRepository from '../../repositories/Quiz';

class QuestionsOfQuizService {
  constructor() {
    this.questionRepository = new QuestionRepository();
    this.quizRepository = new QuizRepository();
  }

  // Lista todas as questões de um determinado quiz
  async index(props) {
    const { id } = props;
    const quiz = await this.quizRepository.findByPk(id);

    if (!quiz) {
      const error = Error();
      error.status = 404;
      error.response = 'Quiz não encontrado!';
      throw error;
    }

    const questionsOfQuiz = await quiz.getQuestions({
      attributes: [
        'id',
        'index',
        'title',
        'timer',
        'difficultyLevel',
        'score',
        'copy',
        'availableOnQuestionsDb',
        'type',
        'idImage',
      ],
      include: [
        {
          model: Answer,
          as: 'answer',
          attributes: ['id', 'title', 'isCorrect'],
        },
        {
          model: File,
          as: 'imageQuestion',
          attributes: ['url', 'path', 'name'],
        },
        {
          model: Tag,
          as: 'tagsQuestion',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
      order: [
        ['index', 'ASC'],
        [{ model: Answer, as: 'answer' }, 'id', 'ASC'],
      ],
    });

    if (!questionsOfQuiz.length) {
      const error = new Error();
      error.status = 204;
      error.response = 'Não existe nenhuma questão cadastrada';
      throw error;
    }

    return questionsOfQuiz;
  }
}

export default new QuestionsOfQuizService();
