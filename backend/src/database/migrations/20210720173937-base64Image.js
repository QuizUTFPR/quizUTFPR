module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'quiz',
          'image_base64',
          {
            type: Sequelize.TEXT('medium'),
          },
          { transaction: t }
        ),
      ])
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('quiz', 'image_base64', {
          transaction: t,
        }),
      ])
    ),
};
