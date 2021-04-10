import Sequelize, { Model } from "sequelize";

class QuestionTrueOrFalseQuiz extends Model {
  static init(sequelize) {
    super.init(
      {
        idQuestion: Sequelize.INTEGER,
        idQuiz: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "questionTrueOrFalseQuizModel"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: "idQuestion",
      as: "question"
    });
    this.belongsTo(models.Quiz, {
      foreignKey: "idQuiz",
      as: "quiz"
    });
  }
}

export default QuestionTrueOrFalseQuiz;
