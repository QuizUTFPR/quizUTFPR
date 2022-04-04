import Sequelize, { Model } from 'sequelize';

class StudentQuiz extends Model {
  static init(sequelize) {
    super.init(
      {
        studentId: Sequelize.INTEGER,
        quizId: Sequelize.UUID,
        hitAmount: Sequelize.INTEGER,
        score: Sequelize.INTEGER,
        isFinished: Sequelize.BOOLEAN,
        classId: Sequelize.UUID,
      },
      {
        sequelize,
        tableName: 'student_quiz',
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

    this.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class',
    });

    this.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      as: 'quiz',
    });

    this.hasMany(models.StudentQuestionChoice, {
      foreignKey: 'studentQuizId',
      as: 'quizQuestionChoice',
    });
  }
}

export default StudentQuiz;
