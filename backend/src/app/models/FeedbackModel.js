import Sequelize, { Model } from 'sequelize';

// import Question from './QuestionModel'

class Feedback extends Model {
  static init(sequelize) {
    super.init(
      {
        studentId: Sequelize.INTEGER,
        message: Sequelize.TEXT,
      },
      {
        sequelize,
        tableName: 'feedback',
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
  }
}

export default Feedback;
