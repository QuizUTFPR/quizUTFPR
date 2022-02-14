// MODELS
import Answer from '../../models/AnswerModel';
import File from '../../models/FileModel';
import Tag from '../../models/TagModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';
import StudentQuizRepository from '../../repositories/StudentQuiz';

class QuestionQuizPublishedService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.studentQuizRepository = new StudentQuizRepository();
  }

  async execute(data) {
    const { studentId, quizId, idStudentQuiz } = data;

    const quiz = await this.quizRepository.findByPk(quizId);

    if (!quiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'Quiz não encontrado!';
      throw error;
    }

    const studentQuiz = await this.studentQuizRepository.findOne({
      where: {
        id: idStudentQuiz,
        isFinished: false,
      },
    });

    if (!studentQuiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'Tentativa não encontrada';
      throw error;
    }

    const studentQuizChoices = await studentQuiz.getQuizQuestionChoice();
    const arrayIDStudentQuizChoices = studentQuizChoices.map(
      (item) => item.questionId
    );

    const questionOfQuiz = await quiz.getQuestions({
      attributes: [
        'id',
        'index',
        'title',
        'timer',
        'difficultyLevel',
        'type',
        'idImage',
      ],
      include: [
        {
          model: Answer,
          as: 'answer',
          attributes: ['id', 'title'],
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

    const amountOfQuestion = await quiz.countQuestions();
    const amountStudentChoice = await quiz.countQuizStudentChoice({
      where: {
        quizId: quiz.id,
        studentQuizId: idStudentQuiz,
        studentId,
      },
    });

    const returnedQuestion = questionOfQuiz.filter(
      (question) => !arrayIDStudentQuizChoices.includes(question.id)
    );

    return {
      amountOfQuestion,
      amountStudentChoice,
      questions: returnedQuestion,
    };
  }
}

export default new QuestionQuizPublishedService();
