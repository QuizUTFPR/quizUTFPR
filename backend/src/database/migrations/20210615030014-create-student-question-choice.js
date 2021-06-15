'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_question_choice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      question_id: {
        type: Sequelize.INTEGER
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_question_choices');
  }
};