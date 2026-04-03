'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FinancialRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER,
      },
      category_id: {
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(14, 2),
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('income', 'expense'),
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      notes: {
        allowNull: true,
        type: Sequelize.TEXT,
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

    await queryInterface.addIndex('FinancialRecords', ['user_id']);
    await queryInterface.addIndex('FinancialRecords', ['category_id']);
    await queryInterface.addIndex('FinancialRecords', ['date']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FinancialRecords');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_FinancialRecords_type\";");
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_FinancialRecords_status\";");
  }
};