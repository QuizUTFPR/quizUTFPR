import Sequelize, { Model } from 'sequelize';

class StudentQuestionChoice extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        question_id: Sequelize.INTEGER,
        quiz_id: Sequelize.INTEGER,
        student_quiz_id: Sequelize.INTEGER,
        time_left: Sequelize.INTEGER.UNSIGNED,
        checked1: Sequelize.BOOLEAN,
        checked2: Sequelize.BOOLEAN,
        checked3: Sequelize.BOOLEAN,
        checked4: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'student_question_answer',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });

    this.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question',
    });

    this.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz',
    });

    this.belongsTo(models.StudentQuiz, {
      foreignKey: 'student_quiz_id',
      as: 'quiz_question_choice',
    });
  }
}

export default StudentQuestionChoice;
