import Sequelize, { Model } from "sequelize";

import QuizModel from '../models/QuizModel'
import QuestionTrueOrFalseModel from '../models/QuestionTrueOrFalseModel'

class QuestionTrueOrFalseQuiz extends Model {
  static init(sequelize) {
    super.init(
      {
        question_id: {
          type: Sequelize.INTEGER,
            references: {
              model: QuestionTrueOrFalseModel,
              key: 'id'
            }
        },
        quiz_id: {
          type: Sequelize.INTEGER,
          references: {
            model: QuizModel,
            key: 'id'
          }
        },
      },
      {
        sequelize,
        tableName: "questionTrueOrFalseQuiz"
      }
    );

    return this;
  }

  static associate(models) {
    // this.belongsTo(models.QuestionTrueOrFalse, {
    //   foreignKey: "question_id",
    //   as: "questionTrueOrFalse"
    // });
    // this.belongsTo(models.Quiz, {
    //   foreignKey: "quiz_id",
    //   as: "quiz"
    // });
  }
}

export default QuestionTrueOrFalseQuiz;
