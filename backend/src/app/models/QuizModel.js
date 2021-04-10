import Sequelize, { Model } from "sequelize";

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        visibility: Sequelize.STRING,
        idImage: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "quiz"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "idImage", as: "image" });
    this.belongsToMany(models.QuestionTrueOrFalse, {
      through: {
        model: models.QuestionTrueOrFalseQuiz,
        foreignKey: "idQuiz",
        as: 'questionsTrueOrFalse'
      },
    });
  }
}

export default Quiz;
