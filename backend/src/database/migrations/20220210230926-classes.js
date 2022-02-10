module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: true,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      pin: {
        allowNull: false,
        type: Sequelize.TEXT,
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
        allowNull: false,
        onDelete: 'CASCADE',
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
