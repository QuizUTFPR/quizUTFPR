import Sequelize, { Model } from 'sequelize';

class FavoriteStudentQuiz extends Model {
  static init(sequelize) {
    super.init(
      {
        quiz_id: Sequelize.INTEGER,
        student_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'favorite_student_quiz',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });

    this.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz',
    });
  }
}

export default FavoriteStudentQuiz;
