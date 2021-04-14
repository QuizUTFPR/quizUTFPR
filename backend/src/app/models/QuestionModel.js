import Sequelize, { Model } from "sequelize";

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        timer: Sequelize.INTEGER.UNSIGNED,
        difficultyLevel: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "question"
      }
    );

    return this;
  }

  static associate(models) {
    console.log("Associação question!");
    this.belongsToMany(models.Quiz, {
      through: "question_quiz",
      foreignKey: "question_id",
      as: "quizzes"
    });

    this.hasMany(models.Answer, {
      foreignKey: "id_question",
      as: "answer"
    });

    this.belongsToMany(models.Tag, {
      through: "question_tags",
      foreignKey: "question_id",
      as: "tags_question"
    });
  }
}

export default Question;
