import Sequelize, { Model } from "sequelize";

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        id_teacher: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        visibility: Sequelize.STRING,
        id_image: Sequelize.INTEGER,
        published: Sequelize.BOOLEAN
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

    this.belongsTo(models.File, {
      foreignKey: "id_image",
      as: "image_quiz"
    });

    this.belongsToMany(models.Question, {
      through: "question_quiz",
      foreignKey: "quiz_id",
      as: "questions",
      onDelete: "CASCADE"
    });

    this.belongsToMany(models.Tag, {
      through: "quiz_tags",
      foreignKey: "quiz_id",
      as: "tags_quiz",
      onDelete: "CASCADE"
    });

    this.belongsTo(models.File, {
      foreignKey: "id_image",
      as: "image"
    });

    this.hasOne(models.StudentQuestionChoice, {
      foreignKey: "quiz_id",
      as: "quiz_student_choice"
    });

    this.hasOne(models.StudentQuizFinishedAttempt, {
      foreignKey: "quiz_id",
      as: "quiz_student_finished"
    });
  }
}

export default Quiz;
