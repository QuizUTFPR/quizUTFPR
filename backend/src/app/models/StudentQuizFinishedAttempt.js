import Sequelize, { Model } from "sequelize";

class StudentQuizFinishedAttempt extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        quiz_id: Sequelize.INTEGER,
        hit_amount: Sequelize.INTEGER,
        score: Sequelize.INTEGER,
        attempt: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: 'student_quiz_finished_attempt',
      }
    );

    return this;
  }

  static associate(models) {
    console.log("Associação question_choice")

    this.belongsTo(models.Student, {
      foreignKey: "student_id",
      as: 'student'
    })

    this.belongsTo(models.Quiz, {
      foreignKey: "quiz_id",
      as: 'quiz'
    })
  }
}

export default StudentQuizFinishedAttempt;
