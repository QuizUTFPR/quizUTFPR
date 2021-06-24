import Sequelize, { Model } from "sequelize";

class StudentQuiz extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        quiz_id: Sequelize.INTEGER,
        hit_amount: Sequelize.INTEGER,
        score: Sequelize.INTEGER,
        attempt: Sequelize.INTEGER,
        is_finished: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "student_quiz"
      }
    );

    return this;
  }

  static associate(models) {
    console.log("Associação question_choice!");

    this.belongsTo(models.Student, {
      foreignKey: "student_id",
      as: "student"
    });

    this.belongsTo(models.Quiz, {
      foreignKey: "quiz_id",
      as: "quiz"
    });

    this.hasOne(models.StudentQuestionChoice, {
      foreignKey: "student_quiz_id",
      as: "quiz_question_attempt"
    })
  }
}

export default StudentQuiz;
