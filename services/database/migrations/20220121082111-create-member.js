'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discriminator: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      snowflakeID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      lastActiveServer: {
        type: Sequelize.BIGINT,
      },
      lastActiveChannel: {
        type: Sequelize.BIGINT,
      },
      lastActiveTs: {
        type: Sequelize.DATE,
      },
      idleTimes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      avgIdleTime: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'new',
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('members');
  }
};
