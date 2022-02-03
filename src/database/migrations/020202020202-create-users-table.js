'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: { autoIncrement: true, type: Sequelize.INTEGER, primaryKey: true, unique: true },
      email: {type: Sequelize.STRING, allowNull: true, unique: true },
      phone: {type: Sequelize.STRING, allowNull: true, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      password: {type: Sequelize.STRING, allowNull: false}
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('users');
    
  }
};
