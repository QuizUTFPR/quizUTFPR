import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        index: Sequelize.INTEGER.UNSIGNED,
        copy: Sequelize.BOOLEAN,
        availableOnQuestionsDb: Sequelize.BOOLEAN,
        idImage: Sequelize.INTEGER,
        timer: Sequelize.INTEGER.UNSIGNED,
        score: Sequelize.INTEGER.UNSIGNED,
        difficultyLevel: Sequelize.ENUM(
          'Muito Fácil',
          'Fácil',
          'Médio',
          'Difícil',
          'Muito Difícil'
        ),
        type: Sequelize.ENUM('multipleChoice', 'singleChoice'),
      },
      {
        sequelize,
        tableName: 'question',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Quiz, {
      through: 'question_quiz',
      foreignKey: 'questionId',
      as: 'quizzes',
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.File, {
      foreignKey: 'idImage',
      as: 'imageQuestion',
      onDelete: 'CASCADE',
      hooks: true,
    });

    this.hasMany(models.Answer, {
      foreignKey: 'idQuestion',
      as: 'answer',
      onDelete: 'CASCADE',
    });

    this.belongsToMany(models.Tag, {
      through: 'question_tags',
      foreignKey: 'questionId',
      as: 'tagsQuestion',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.StudentQuestionChoice, {
      foreignKey: 'questionId',
      as: 'questionChoice',
    });
  }
}

export default Question;
