import Sequelize, { Model } from 'sequelize';

class StudentQuestionChoice extends Model {
  static init(sequelize) {
    super.init(
      {
        studentId: Sequelize.INTEGER,
        questionId: Sequelize.INTEGER,
        quizId: Sequelize.INTEGER,
        studentQuizId: Sequelize.INTEGER,
        timeLeft: Sequelize.INTEGER.UNSIGNED,
        checked1: Sequelize.BOOLEAN,
        checked2: Sequelize.BOOLEAN,
        checked3: Sequelize.BOOLEAN,
        checked4: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'student_question_answer',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student',
    });

    this.belongsTo(models.Question, {
      foreignKey: 'questionId',
      as: 'question',
    });

    this.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      as: 'quiz',
    });

    this.belongsTo(models.StudentQuiz, {
      foreignKey: 'studentQuizId',
      as: 'quizQuestionChoice',
    });
  }
}

export default StudentQuestionChoice;
