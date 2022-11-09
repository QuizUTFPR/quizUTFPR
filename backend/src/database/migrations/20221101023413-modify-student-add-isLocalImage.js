module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('file', 'is_local_image', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }),
    ]),

  down: async (queryInterface) =>
    Promise.all([queryInterface.removeColumn('file', 'is_local_image')]),
};
