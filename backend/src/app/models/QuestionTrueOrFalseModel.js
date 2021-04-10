import Sequelize, { Model } from "sequelize";

class Question extends Model {
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

  static associate(models) {}
}

export default Question;
