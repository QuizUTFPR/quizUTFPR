import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        picture: Sequelize.STRING,
        uid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
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
