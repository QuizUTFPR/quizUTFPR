"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("questionTrueOrFalse", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correct_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      timer: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 30
      },
      difficulty_level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("questionTrueOrFalse");
  }
};
