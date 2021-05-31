"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("question", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
      id_image: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "file", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
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
    return queryInterface.dropTable("question");
  }
};
