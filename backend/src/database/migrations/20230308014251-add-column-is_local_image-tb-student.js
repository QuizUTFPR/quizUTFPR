module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('student', 'is_local_image', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('student', 'is_local_image');
  },
};
