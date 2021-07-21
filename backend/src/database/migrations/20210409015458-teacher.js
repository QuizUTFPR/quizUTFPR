module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('teacher', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: 'Sem Nome',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // password_hash: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('teacher'),
};
