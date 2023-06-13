module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('student', 'url_image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('student', 'url_image');
  },
};
