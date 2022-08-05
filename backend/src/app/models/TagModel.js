import Sequelize, { Model } from 'sequelize';

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          primaryKey: true,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'tag',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Quiz, {
      through: 'quiz_tags',
      foreignKey: 'tagName',
      as: 'quizzes',
      onDelete: 'CASCADE',
    });

    this.belongsToMany(models.Question, {
      through: 'question_tags',
      foreignKey: 'tagName',
      as: 'questions',
      onDelete: 'CASCADE',
    });
  }
}

export default Tag;
