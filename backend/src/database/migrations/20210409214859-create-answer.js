module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('answer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_question: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { model: 'question', key: 'id' },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
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

  down: (queryInterface) => queryInterface.dropTable('answer'),
};
