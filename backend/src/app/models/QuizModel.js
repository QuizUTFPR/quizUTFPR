import Sequelize, { Model } from 'sequelize';

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        idTeacher: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        visibility: Sequelize.STRING,
        idImage: Sequelize.INTEGER,
        published: Sequelize.BOOLEAN,
        pin: Sequelize.STRING,
        publishDate: Sequelize.DATE,
        noTime: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'quiz',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Teacher, {
      foreignKey: 'idTeacher',
      as: 'teacher',
    });

    this.belongsToMany(models.Question, {
      through: 'question_quiz',
      foreignKey: 'quizId',
      as: 'questions',
      onDelete: 'CASCADE',
    });

    this.belongsToMany(models.Tag, {
      through: 'quiz_tags',
      foreignKey: 'quizId',
      as: 'tagsQuiz',
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.File, {
      foreignKey: 'idImage',
      as: 'image',
      onDelete: 'CASCADE',
      hooks: true,
    });

    this.hasMany(models.StudentQuestionChoice, {
      foreignKey: 'quizId',
      as: 'quizStudentChoice',
    });

    this.hasMany(models.StudentQuiz, {
      foreignKey: 'quizId',
      as: 'quizStudent',
    });

    this.hasMany(models.FavoriteStudentQuiz, {
      foreignKey: 'quizId',
      as: 'quizFavorite',
    });
  }
}

export default Quiz;
