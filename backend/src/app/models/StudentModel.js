import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        id_image: Sequelize.INTEGER
      },
      {
        sequelize,
        tableName: "student"
      }
    );

    this.addHook("beforeSave", async student => {
      if (student.password) {
        student.password_hash = await bcrypt.hash(student.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: "id_image",
      as: 'image_profile'
    })

    this.hasOne(models.StudentQuestionChoice, {
      foreignKey: "student_id",
      as: 'student_choice'
    })

    this.hasOne(models.StudentQuizFinishedAttempt, {
      foreignKey: "student_id",
      as: 'student_quiz_finished'
    })
  }

  

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Student;
