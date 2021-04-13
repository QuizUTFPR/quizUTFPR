import Sequelize, { Model } from "sequelize";

// import Question from './QuestionModel'

class QuestionTrueOrFalse extends Model {
  static init(sequelize) {
    super.init(
      {
        id_question: Sequelize.INTEGER,
        correctAnswer: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: "question_true_or_false"
      }
    );

    return this;
  }

  static associate(models) {
    // this.belongsTo(models.Question, {
    //   foreignKey: "id_question",
    //   as: "question"
    // });
  }
}

export default QuestionTrueOrFalse;
