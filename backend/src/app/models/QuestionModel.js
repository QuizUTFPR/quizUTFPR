import Sequelize, { Model } from "sequelize";

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        copy: Sequelize.BOOLEAN,
        available_on_questions_db: Sequelize.BOOLEAN,
        id_image: Sequelize.INTEGER,
        timer: Sequelize.INTEGER.UNSIGNED,
        difficulty_level: Sequelize.INTEGER,
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
      as: "quizzes",
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.File, {
      foreignKey: "id_image",
      as: 'image_question'
    })

    this.hasMany(models.Answer, {
      foreignKey: "id_question",
      as: "answer",
      onDelete: 'CASCADE',
    });

    this.belongsToMany(models.Tag, {
      through: "question_tags",
      foreignKey: "question_id",
      as: "tags_question",
      onDelete: 'CASCADE',
    });
  }
}

export default Question;
