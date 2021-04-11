import Sequelize, { Model } from "sequelize";

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        visibility: Sequelize.STRING,
        id_image: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "quiz"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "id_image", as: "image" });
    this.belongsToMany(models.QuestionTrueOrFalse, {
      through: {
        model: models.QuestionTrueOrFalseQuiz
      },
      foreignKey: "quiz_id",
      as: 'questionsTrueOrFalse'
    });
  }
}

export default Quiz;
