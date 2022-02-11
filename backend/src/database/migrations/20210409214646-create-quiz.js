module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('quiz', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: 'teacher', key: 'id' },
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      visibility: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      id_image: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: 'file', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      pin: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      publish_date: {
        type: Sequelize.DATE,
      },
      no_time: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

  down: (queryInterface) => queryInterface.dropTable('quiz'),
};
