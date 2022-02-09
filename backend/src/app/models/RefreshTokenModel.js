import Sequelize, { Model } from 'sequelize';

class RefreshToken extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        expiresIn: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'refresh_token',
        underscored: true,
      }
    );

    return this;
  }
}

export default RefreshToken;
