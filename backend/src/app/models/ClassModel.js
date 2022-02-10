import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.UUID,
        idTeacher: Sequelize.INTEGER,
        pin: Sequelize.TEXT,
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
      as: 'image',
      onDelete: 'CASCADE',
      hooks: true,
    });
  }
}

export default Class;
