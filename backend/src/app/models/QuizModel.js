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
    console.log("associação quiz!");
    this.belongsToMany(models.QuestionTrueOrFalse, {
      through: 'questiontrueorfalsequiz',
      foreignKey: "quiz_id",
      as: 'questionsTrueOrFalse'
    });
    this.belongsTo(models.File, { foreignKey: "id_image", as: "image" });
  }
}

export default Quiz;
