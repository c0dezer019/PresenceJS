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
      guild: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      snowflakeID: {
        type: Sequelize.BIGINT,
        allowNull: false,
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
