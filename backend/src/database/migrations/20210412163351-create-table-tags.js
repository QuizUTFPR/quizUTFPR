module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tag', {
      name: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('tag'),
};
