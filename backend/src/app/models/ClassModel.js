import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        idTeacher: Sequelize.INTEGER,
        pin: Sequelize.STRING,
        title: Sequelize.TEXT,
        description: Sequelize.TEXT,
        idImage: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'classes',
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

    this.belongsTo(models.File, {
      foreignKey: 'idImage',
      as: 'imageClass',
      onDelete: 'CASCADE',
      hooks: true,
    });
  }
}

export default Class;