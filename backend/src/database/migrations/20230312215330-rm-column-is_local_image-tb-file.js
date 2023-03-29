module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('file', 'is_local_image');
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('file');
  },
};
