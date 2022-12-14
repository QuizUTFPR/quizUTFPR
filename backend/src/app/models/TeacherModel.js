import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // uid: Sequelize.STRING,
        // O campo 'virtual' nao existe no db, apenas na execução
        // password: Sequelize.VIRTUAL,
        // passwordHash: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'teacher',
        underscored: true,
      }
    );

    // this.addHook('beforeSave', async (teacher) => {
    //   if (teacher.password) {
    //     // eslint-disable-next-line no-param-reassign
    //     teacher.passwordHash = await bcrypt.hash(teacher.password, 8);
    //   }
    // });

    return this;
  }

  // checkPassword(password) {
  //   return bcrypt.compare(password, this.passwordHash);
  // }
}

export default Teacher;
