import Sequelize, { Model } from "sequelize";

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          primaryKey: true,
          unique: true
        }
      },
      {
        sequelize,
        tableName: "tag"
      }
    );

    return this;
  }

  static associate(models) {
    console.log("Associação tag")
    this.belongsToMany(models.Quiz, {
      through: 'quiz_tags',
      foreignKey: "tag_name",
      as: "quizzes"
    });

  }
}

export default Tag;
