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
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        expires_in: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'refresh_token',
      }
    );

    return this;
  }
}

export default RefreshToken;
