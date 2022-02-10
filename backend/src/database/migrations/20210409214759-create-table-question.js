module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('question', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      index: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      copy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      available_on_questions_db: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timer: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 30,
      },
      score: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      difficulty_level: {
        type: Sequelize.ENUM(
          'Muito Fácil',
          'Fácil',
          'Médio',
          'Difícil',
          'Muito Difícil'
        ),
        allowNull: false,
      },
      id_image: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: 'file', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('multipleChoice', 'singleChoice'),
        allowNull: false,
        defaultValue: 'multipleChoice',
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

  down: (queryInterface) => queryInterface.dropTable('question'),
};
