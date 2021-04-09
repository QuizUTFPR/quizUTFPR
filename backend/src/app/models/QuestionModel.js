import Sequelize, { Model } from "sequelize";

class Question extends Model {
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

export default Question;
