'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Salary',
        type: 'income',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'Freelance',
        type: 'income',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: 'Rent',
        type: 'expense',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        name: 'Food',
        type: 'expense',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', {
      name: ['Salary', 'Freelance', 'Rent', 'Food'],
    });
  },
};
