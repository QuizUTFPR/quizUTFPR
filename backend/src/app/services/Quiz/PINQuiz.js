// MODELS
import Teacher from '../../models/TeacherModel';
import Tag from '../../models/TagModel';
import File from '../../models/FileModel';

// REPOSITORIES
import QuizRepository from '../../repositories/Quiz';

class PINQuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
  }

  async findByPin(data) {
    const { pin, studentId } = data;

    const quiz = await this.quizRepository.findOne({
      where: {
        pin,
      },
      include: [
        {
          model: Teacher,
          as: 'teacher',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'image',
          attributes: ['url', 'path', 'name'],
        },
        {
          model: Tag,
          as: 'tagsQuiz',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!quiz) {
      const error = new Error();
      error.status = 404;
      error.response = 'PIN inválido!';
      throw error;
    }

    const questionAmount = await quiz.countQuestions();

    const quizStudent = await quiz.getQuizStudent({
      where: {
        quizId: quiz.id,
        studentId,
        isFinished: false,
      },
    });

    let studentChoicesAmount = null;
    if (quizStudent.length > 0) {
      studentChoicesAmount = await quiz.countQuizStudentChoice({
        where: {
          studentId,
          quizId: quiz.id,
          studentQuizId: quizStudent[0].id,
        },
      });
    }

    return {
      quiz,
      questionAmount,
      studentChoicesAmount,
      idStudentQuiz: quizStudent.length > 0 ? quizStudent[0].id : null,
    };
  }
}

export default new PINQuizService();
