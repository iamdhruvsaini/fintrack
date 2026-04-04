'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = '$2b$10$DDjQioBC.O7kZYUD7koD8OhSaGsmcRj11h65FTN9otGqUc4RYQUNK';

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Viewer User',
        email: 'viewer@fintrack.local',
        password_hash: passwordHash,
        role_id: 1,
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'Analyst User',
        email: 'analyst@fintrack.local',
        password_hash: passwordHash,
        role_id: 2,
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@fintrack.local',
        password_hash: passwordHash,
        role_id: 3,
        status: 'active',
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {
      email: ['viewer@fintrack.local', 'analyst@fintrack.local', 'admin@fintrack.local'],
    });
  },
};
