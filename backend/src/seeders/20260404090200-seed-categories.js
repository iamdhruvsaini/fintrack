'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Salary',
        description: 'Primary salary income category',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'Freelance',
        description: 'Side project and contract income category',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: 'Rent',
        description: 'Housing-related recurring payment category',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        name: 'Food',
        description: 'Dining and grocery spending category',
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
