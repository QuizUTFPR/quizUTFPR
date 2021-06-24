'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_quiz', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "student",
          key: "id"
        }
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "quiz",
          key: "id"
        }
      },
      is_finished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      hit_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      attempt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_quiz');
  }
};