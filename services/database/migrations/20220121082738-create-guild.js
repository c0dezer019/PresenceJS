'use strict';
const settings = JSON.stringify(require('../../utils/guildSettings'));

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('guilds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      snowflakeID: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      memberCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lastActiveTs: {
        type: Sequelize.DATE,
      },
      lastActiveChannel: {
        type: Sequelize.BIGINT,
      },
      idleTimes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      avgIdleTime: {
        type: Sequelize.INTEGER,
      },
      settings: {
        type: Sequelize.JSON,
        defaultValue: settings
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
    await queryInterface.dropTable('guilds');
  }
};
