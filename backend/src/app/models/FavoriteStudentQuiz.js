import Sequelize, { Model } from 'sequelize';

class FavoriteStudentQuiz extends Model {
  static init(sequelize) {
    super.init(
      {
        quizId: Sequelize.UUID,
        studentId: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'favorite_student_quiz',
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

    this.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      as: 'quiz',
    });
  }
}

export default FavoriteStudentQuiz;
