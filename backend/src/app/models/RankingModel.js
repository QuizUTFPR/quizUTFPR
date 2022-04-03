import Sequelize, { Model } from 'sequelize';

class Ranking extends Model {
  static init(sequelize) {
    super.init(
      {
        studentId: Sequelize.INTEGER,
        quizId: Sequelize.UUID,
        studentQuizId: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'ranking',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'rankStudent',
    });

    this.belongsTo(models.Quiz, {
      foreignKey: 'quizId',
      as: 'rankQuiz',
    });

    this.belongsTo(models.StudentQuiz, {
      foreignKey: 'studentQuizId',
      as: 'rankStudentQuiz',
    });
  }
}

export default Ranking;
