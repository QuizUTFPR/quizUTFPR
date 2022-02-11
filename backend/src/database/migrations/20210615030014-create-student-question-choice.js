module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_question_answer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'student',
          key: 'id',
        },
      },
      question_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'question',
          key: 'id',
        },
      },
      quiz_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'quiz',
          key: 'id',
        },
      },
      student_quiz_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'student_quiz',
          key: 'id',
        },
      },
      time_left: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      checked1: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      checked2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      checked3: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      checked4: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('student_question_answer');
  },
};
