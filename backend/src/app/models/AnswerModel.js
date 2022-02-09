import Sequelize, { Model } from 'sequelize';

// import Question from './QuestionModel'

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        idQuestion: Sequelize.INTEGER,
        title: Sequelize.STRING,
        isCorrect: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'answer',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: 'idQuestion',
      as: 'question',
    });
  }
}

export default Answer;
