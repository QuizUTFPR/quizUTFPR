import Sequelize, { Model } from "sequelize";

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {

      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models){
  }
}

export default Quiz;
