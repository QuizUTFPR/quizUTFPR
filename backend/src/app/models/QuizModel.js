import Sequelize, { Model } from "sequelize";

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING(300),
        description: Sequelize.TEXT,
        visibility: Sequelize.STRING(10),
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
    this.belongsToMany(models.QuestionTrueOrFalseQuiz, {
      through: { model: models.QuestionTrueOrFalseQuizModel, unique: false },
      foreignKey: "idQuiz",
      constraints: false
    });
  }
}

export default Quiz;
