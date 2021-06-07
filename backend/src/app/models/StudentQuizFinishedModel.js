import Sequelize, { Model } from "sequelize";

class StudentQuizFinished extends Model {
  static init(sequelize) {
    super.init(
      {
        quiz_id: Sequelize.INTEGER,
        question_id: Sequelize.INTEGER,
        student_id: Sequelize.INTEGER,
        hit_amount: Sequelize.INTEGER,
        score: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "student_quiz_finished"
      }
    );

    return this;
  }

  static associate(models) {
    console.log("associação student_quiz_finished!");

    this.belongsTo(models.Quiz, {
      foreignKey: "quiz_id",
      as: "quiz"
    });

    this.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "question"
    });

    this.belongsTo(models.Student, {
      foreignKey: "student_id",
      as: "student"
    });
    
  }
}

export default StudentQuizFinished;
