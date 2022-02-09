// SERVICES
import PINQuizService from '../../services/Quiz/PINQuiz';

class PINQuizController {
  constructor() {
    this.pinQuizService = new PINQuizService();
  }

  // async index(req, res) {
  //   try {
  //     const { pin } = req.body;
  //     const student_id = req.userId;

  //     const quiz = await Quiz.findOne({
  //       where: {
  //         pin,
  //       },
  //       include: [
  //         {
  //           model: Teacher,
  //           as: 'teacher',
  //           attributes: ['name', 'email'],
  //         },
  //         {
  //           model: File,
  //           as: 'image_quiz',
  //           attributes: ['url', 'path', 'name'],
  //         },
  //         {
  //           model: Tag,
  //           as: 'tagsQuiz',
  //           attributes: ['name'],
  //           through: {
  //             attributes: [],
  //           },
  //         },
  //       ],
  //     });

  //     if (!quiz) return res.status(404).json({ error: 'PIN inválido!' });

  //     const questionAmount = await quiz.countQuestions();

  //     const quizStudent = await quiz.getQuiz_student({
  //       where: {
  //         quiz_id: quiz.id,
  //         student_id,
  //         is_finished: false,
  //       },
  //     });

  //     let studentChoicesAmount = null;
  //     if (quizStudent.length > 0) {
  //       studentChoicesAmount = await quiz.countQuiz_student_choice({
  //         where: {
  //           student_id,
  //           quiz_id: quiz.id,
  //           student_quiz_id: quizStudent[0].id,
  //         },
  //       });
  //     }

  //     return res.status(200).json({
  //       quiz,
  //       questionAmount,
  //       studentChoicesAmount,
  //       id_student_quiz: quizStudent.length > 0 ? quizStudent[0].id : null,
  //     });
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // }

  async index(req, res) {
    try {
      const { pin } = req.body;
      const student_id = req.userId;

      const quiz = await this.pinQuizService.findByPin({
        pin,
        student_id,
      });

      return res.status(200).json(quiz);
    } catch (error) {
      return (
        (!!error.status && res.status(error.status).json(error)) ||
        res.status(500).json(error)
      );
    }
  }
}

export default new PINQuizController();
