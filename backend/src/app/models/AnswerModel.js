import Sequelize, { Model } from "sequelize";

// import Question from './QuestionModel'

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        id_question: Sequelize.INTEGER,
        title: Sequelize.STRING,
        is_correct: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: "answer"
      }
    );

    return this;
  }

  static associate(models) {
    console.log("Associação answer!");

    this.belongsTo(models.Question, {
      foreignKey: "id_question",
      as: "question"
    });
  }
}

export default Answer;
