import Sequelize, { Model } from "sequelize";
// import bcrypt from "bcryptjs";

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // O campo 'virtual' nao existe no db, apenas na execução
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async teacher => {
      if (teacher.password) {
        // teacher.password_hash = await bcrypt.hash(teacher.password, 8);
        teacher.password_hash = teacher.password;
      }
    });

    return this;
  }

  static associate(models) {
    // this.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
  }

  checkPassword(password) {
    return password == this.password_hash;
  }
}

export default Teacher;
