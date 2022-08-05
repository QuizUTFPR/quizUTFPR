import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        ra: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passwordHash: Sequelize.STRING,
        idImage: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'student',
        underscored: true,
      }
    );

    this.addHook('beforeSave', async (student) => {
      if (student.password) {
        // eslint-disable-next-line no-param-reassign
        student.passwordHash = await bcrypt.hash(student.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'idImage',
      as: 'imageProfile',
    });

    this.hasMany(models.StudentQuestionChoice, {
      foreignKey: 'studentId',
      as: 'studentChoice',
    });

    this.hasMany(models.StudentQuiz, {
      foreignKey: 'studentId',
      as: 'studentQuiz',
    });

    this.hasMany(models.FavoriteStudentQuiz, {
      foreignKey: 'studentId',
      as: 'studentFavorite',
    });

    this.hasMany(models.Ranking, {
      foreignKey: 'studentId',
      as: 'studentRank',
    });

    this.belongsToMany(models.Class, {
      through: 'student_class',
      foreignKey: 'idStudent',
      as: 'student_classes',
      onDelete: 'CASCADE',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export default Student;
