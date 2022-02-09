// MODELS
import Quiz from '../../models/QuizModel';
import Answer from '../../models/AnswerModel';
import Student from '../../models/StudentModel';

import StudentQuiz from '../../models/StudentQuiz';

class StatisticsQuizController {
  // Lista todos os registros
  async show(req, res) {
    try {
      const { quizId } = req.body;

      const quiz = await Quiz.findByPk(quizId, {
        attributes: ['id', 'title', 'pin'],
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

      // GETTING THE ATTEMPT FROM EACH STUDENT CONSIDERING THE HIGHEST SCORE
      // AND RETURN AN ARRAY OF ID ABOUT THE BEST ATTEMPT
      const ArrayOfIDAboutBestScoreAttemptQuiz = await Promise.all(
        studentQuizAttempt.map(async (choice) => {
          const student = await choice.getStudent({
            include: [
              {
                model: StudentQuiz,
                as: 'studentQuiz',
                where: {
                  quizId,
                  isFinished: true,
                },
                attributes: ['id', 'score'],
              },
            ],
            order: [
              [
                {
                  model: StudentQuiz,
                  as: 'studentQuiz',
                },
                'score',
                'DESC',
              ],
            ],
          });

          return student.studentQuiz[0].id;
        })
      );

      let percentageOfQuizHit = 0; // % OF CORRECT ANSWERS CHOICES OF THE STUDENT

      // INCLUDING IN THE QUESTION ALL THE CHOICES OF THE STUDENT
      // WE ONLY CONSIDER THE CHOICE ABOUT THE BEST SCORE
      const returnedQuestions = await Promise.all(
        questions.map(async (question) => {
          const questionChoice = await question.getQuestionChoice({
            where: {
              studentQuizId: ArrayOfIDAboutBestScoreAttemptQuiz,
            },
            attributes: [
              'studentQuizId',
              'studentId',
              'timeLeft',
              'checked1',
              'checked2',
              'checked3',
              'checked4',
            ],
            include: [
              {
                model: Student,
                as: 'student',
                attributes: ['name', 'email'],
              },
            ],
          });

          let sumOfTimeSpentToAnswer = 0; // AVG OF TIME THAT WAS SPENT TO ANSWER THE QUESTION
          // eslint-disable-next-line array-callback-return
          questionChoice.map((questionMapItem) => {
            sumOfTimeSpentToAnswer += question.timer - questionMapItem.timeLeft;
          });

          const avgOfTimeSpentToAnswer =
            sumOfTimeSpentToAnswer / questionChoice.length;

          // CALCULATING HOW MANY TIMES EACH ANSWER HAD BEEN CHOOSED
          const { answer } = question;
          if (answer[0]) answer[0].dataValues.numberOfChoices = 0;
          if (answer[1]) answer[1].dataValues.numberOfChoices = 0;
          if (answer[2]) answer[2].dataValues.numberOfChoices = 0;
          if (answer[3]) answer[3].dataValues.numberOfChoices = 0;

          let hitAmount = 0; // SUM OF HIT (CORRECT ANSWER)
          // eslint-disable-next-line array-callback-return
          questionChoice.map((choice) => {
            const { checked1, checked2, checked3, checked4 } = choice;
            let hasWrongChoice = false;
            let hitAmountChoice = 0;

            if (checked1) {
              answer[0].dataValues.numberOfChoices += 1;
              if (checked1 && answer[0].dataValues.isCorrect && !hasWrongChoice)
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }
            if (checked2) {
              answer[1].dataValues.numberOfChoices += 1;
              if (checked2 && answer[1].dataValues.isCorrect && !hasWrongChoice)
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }
            if (checked3) {
              answer[2].dataValues.numberOfChoices += 1;
              if (checked3 && answer[2].dataValues.isCorrect && !hasWrongChoice)
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }
            if (checked4) {
              answer[3].dataValues.numberOfChoices += 1;
              if (checked4 && answer[3].dataValues.isCorrect && !hasWrongChoice)
                hitAmountChoice += 1;
              else hasWrongChoice = true;
            }

            if (!hasWrongChoice) hitAmount += hitAmountChoice;
          });

          const percentageOfHit = (hitAmount * 100) / questionChoice.length;
          percentageOfQuizHit += percentageOfHit;

          return {
            avgOfTimeSpentToAnswer: avgOfTimeSpentToAnswer.toFixed(2),
            percentageOfHit: percentageOfHit.toFixed(2),
            ...question.dataValues,
            answer,
            questionChoice,
          };
        })
      );

      percentageOfQuizHit /= questions.length;

      return res.status(200).json({
        quiz,
        percentageOfQuizHit,
        questions: returnedQuestions,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new StatisticsQuizController();
