module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quiz_class', {
      id_class: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      id_quiz: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
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
    await queryInterface.dropTable('quiz_class');
  },
};
