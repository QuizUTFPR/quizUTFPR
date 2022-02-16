module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_class', {
      id_class: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      id_student: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    await queryInterface.dropTable('student_class');
  },
};
