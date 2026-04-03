'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('income', 'expense'),
      },
      status: {
        allowNull: false,
        defaultValue: 'active',
        type: Sequelize.ENUM('active', 'inactive'),
      },
      is_deleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    await queryInterface.addIndex('Categories', ['type']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Categories_type\";");
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Categories_status\";");
  }
};