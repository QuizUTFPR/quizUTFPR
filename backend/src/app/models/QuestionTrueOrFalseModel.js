import Sequelize, { Model } from "sequelize";

class QuestionTrueOrFalse extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        correctAnswer: Sequelize.BOOLEAN,
        timer: Sequelize.INTEGER.UNSIGNED,
        difficultyLevel: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "questionTrueOrFalse"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Quiz, {
      through: {
        model: models.QuestionTrueOrFalseQuiz
      },
      foreignKey: "question_id",
      as: "quizzes"
    });
  }
}

export default QuestionTrueOrFalse;
