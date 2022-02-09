// MODELS
import Quiz from '../../models/QuizModel';
import Answer from '../../models/AnswerModel';

import StudentQuiz from '../../models/StudentQuiz';
import StudentQuestionChoice from '../../models/StudentQuestionChoice';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { quizId } = req.body;

      const quiz = await Quiz.findByPk(quizId, {
        attributes: [
          'id',
          'title',
          'description',
          'visibility',
          'idImage',
          'pin',
          'noTime',
        ],
      });

      if (!quiz)
        return res.status(404).json({
          error: 'Quiz não encontrado!',
        });

      const questions = await quiz.getQuestions({
        joinTableAttributes: [],
        include: [
          {
            model: Answer,
            as: 'answer',
            attributes: ['id', 'title', 'isCorrect'],
          },
        ],
        attributes: [
          'id',
          'title',
          'index',
          'timer',
          'score',
          'difficultyLevel',
          'type',
        ],
        order: [
          ['index', 'ASC'],
          [
            {
              model: Answer,
              as: 'answer',
            },
            'id',
            'ASC',
          ],
        ],
      });

      if (!questions)
        return res.status(404).json({
          error: 'Quiz não possui questões cadastradas!',
        });

      //  GETTING ALL THE STUDENT THAT ANSWERED THE QUIZ
      const studentQuizAttempt = await quiz.getQuizStudent({
        where: {
          isFinished: true,
        },
        attributes: ['studentId', 'quizId'],
        group: ['studentId'],
      });

      const studentQuiz = await Promise.all(
        studentQuizAttempt.map(async (choice) => {
          const student = await choice.getStudent({
            attributes: ['id', 'name', 'email'],
            include: [
              {
                model: StudentQuiz,
                as: 'studentQuiz',
                where: {
                  quizId,
                  isFinished: true,
                },
                attributes: ['id', 'score', 'studentId'],
                include: [
                  {
                    model: StudentQuestionChoice,
                    as: 'quizQuestionChoice',
                    attributes: [
                      'id',
                      'timeLeft',
                      'questionId',
                      'checked1',
                      'checked2',
                      'checked3',
                      'checked4',
                    ],
                  },
                ],
              },
            ],
            order: [
              [{ model: StudentQuiz, as: 'studentQuiz' }, 'score', 'DESC'],
              [
                { model: StudentQuiz, as: 'studentQuiz' },
                { model: StudentQuestionChoice, as: 'quizQuestionChoice' },
                'id',
                'ASC',
              ],
            ],
          });

          return {
            ...student.dataValues,
            studentQuiz: student.studentQuiz[0],
          };
        })
      );

      return res.status(200).json({ questions, studentQuiz });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();
