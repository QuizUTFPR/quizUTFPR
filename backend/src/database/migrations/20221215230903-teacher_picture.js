module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'teacher',
          'picture',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ])
    ),

  down: async (queryInterface, Sequelize) => {},
};
