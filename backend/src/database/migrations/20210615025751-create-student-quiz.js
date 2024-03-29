module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_quiz', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'student',
          key: 'id',
        },
      },
      class_id: {
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'classes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      quiz_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'quiz',
          key: 'id',
        },
      },
      is_finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hit_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('student_quiz');
  },
};
