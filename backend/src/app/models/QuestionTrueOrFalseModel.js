import Sequelize, { Model } from "sequelize";

class QuestionTrueOrFalse extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING(300),
        correctAnswer: Sequelize.BOOLEAN,
        timer: Sequelize.INTEGER.UNSIGNED,
        difficultyLevel: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "quesitonTrueOrFalse"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.QuestionTrueOrFalseQuiz, {
      through: { model: models.QuestionTrueOrFalseQuizModel, unique: false },
      foreignKey: "idQuestion",
      constraints: false
    });
  }
}

export default QuestionTrueOrFalse;
