module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      pin: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'teacher',
          key: 'id',
        },
      },
      id_image: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'file',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      visibility: {
        type: Sequelize.ENUM('private', 'public'),
        allowNull: false,
        defaultValue: 'private',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('classes');
  },
};
