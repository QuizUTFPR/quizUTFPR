"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("questionTrueOrFalseQuiz", {
      idQuestion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "questionTrueOrFalse", key: "id" } // Quiz hasMany Questions
      },
      idQuiz: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "quiz", key: "id" } // question belongsToMany Quiz
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("questionTrueOrFalseQuiz");
  }
};