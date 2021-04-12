import Sequelize, { Model } from "sequelize";

class QuestionTrueOrFalse extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        correctAnswer: Sequelize.BOOLEAN,
        timer: Sequelize.INTEGER.UNSIGNED,
        difficultyLevel: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "questionTrueOrFalse"
      }
    );

    return this;
  }

  static associate(models) {
    console.log("Associação question true or false!")
    this.belongsToMany(models.Quiz, {
      through: 'questiontrueorfalsequiz',
      foreignKey: "question_id",
      as: "quizzes"
    });

  }
}

export default QuestionTrueOrFalse;
