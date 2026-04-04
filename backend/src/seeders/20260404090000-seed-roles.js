'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'viewer',
        description: 'Can only view dashboard and records',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'analyst',
        description: 'Can view records and insights',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: 'admin',
        description: 'Full access to manage users and records',
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', {
      name: ['viewer', 'analyst', 'admin'],
    });
  },
};
