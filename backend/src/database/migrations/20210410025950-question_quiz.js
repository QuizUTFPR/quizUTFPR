module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('question_quiz', {
      question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'question',
          key: 'id',
        }, // Quiz hasMany Questions
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'quiz',
          key: 'id',
        }, // question belongsToMany Quiz
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

  down: (queryInterface) => queryInterface.dropTable('question_quiz'),
};
