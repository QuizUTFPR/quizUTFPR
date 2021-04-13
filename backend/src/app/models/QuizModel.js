import Sequelize, { Model } from "sequelize";

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        id_teacher: Sequelize.INTEGER,
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

    this.belongsTo(models.Teacher, {
      foreignKey: "id_teacher",
      as: "teacher"
    });

    this.belongsToMany(models.Question, {
      through: 'question_quiz',
      foreignKey: "quiz_id",
      as: 'questions'
    });

    this.belongsToMany(models.Tag, {
      through: 'quiz_tags',
      foreignKey: "quiz_id",
      as: 'tags'
    })

    this.belongsTo(models.File, { foreignKey: "id_image", as: "image" });
  }
}

export default Quiz;
