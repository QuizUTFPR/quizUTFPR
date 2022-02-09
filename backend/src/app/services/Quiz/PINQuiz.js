// MODELS
import Quiz from '../../models/QuizModel';
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
    const { pin, student_id } = data;

    const quiz = await Quiz.findOne({
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
          as: 'image_quiz',
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
      const error = new Error('PIN inválido!');
      error.status = 404;
      throw error;
    }

    const questionAmount = await quiz.countQuestions();

    const quizStudent = await quiz.getQuiz_student({
      where: {
        quiz_id: quiz.id,
        student_id,
        is_finished: false,
      },
    });

    let studentChoicesAmount = null;
    if (quizStudent.length > 0) {
      studentChoicesAmount = await quiz.countQuiz_student_choice({
        where: {
          student_id,
          quiz_id: quiz.id,
          student_quiz_id: quizStudent[0].id,
        },
      });
    }

    return {
      quiz,
      questionAmount,
      studentChoicesAmount,
      id_student_quiz: quizStudent.length > 0 ? quizStudent[0].id : null,
    };
  }
}

export default PINQuizService;
