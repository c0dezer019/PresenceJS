'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      guildSnowflakeID: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      memberSnowflakeID: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discriminator: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      botAdmin: {
        type: Sequelize.BOOLEAN,
      },
      awol: {
        type: Sequelize.BOOLEAN,
      },
      exempt: {
        type: Sequelize.BOOLEAN,
      },
      reasonExempt: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      idleTimes: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
      },
      lastActiveTs: {
        type: Sequelize.DATE,
      },
      avgIdleTime: {
        type: Sequelize.BIGINT,
      },
      lastActiveChannel: {
        type: Sequelize.BIGINT,
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nodes');
  }
};
