"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("quiz_tags", {
      tag_name: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "tag",
          key: "name"
        },
        
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: "quiz",
          key: "id"
        }
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
    return queryInterface.dropTable("quiz_tags");
  }
};
