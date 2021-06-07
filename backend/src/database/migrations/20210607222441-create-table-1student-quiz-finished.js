'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_quiz_finished', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "quiz", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      question_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "question", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      student_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "student", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      hit_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_quiz_finished');
  }
};
