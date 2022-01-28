'use strict';

const { Model } = require('sequelize');
const { timeIdle } = require('../../utils/calculate.js');

module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get idleStr() { return timeIdle(this.lastActiveTs) }
    get user() {
      return this.username + '#' + this.discriminator + ' (' + this.memberId + ')';
    }

    static associate(models) {
      models.member.hasMany(models.node);
      models.member.belongsToMany(models.guild, { through: "membersGuilds" });
    }
  }
  member.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 32],
      },
    },
    discriminator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 4,
        isNumeric: true,
      }
    },
    snowflakeID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: { isNumeric: true }
    },
    lastActiveServer: {
      type: DataTypes.BIGINT,
      validate: { isNumeric: true }
    },
    lastActiveChannel: {
      type: DataTypes.BIGINT,
      validate: { isNumeric: true }
    },
    lastActiveTs: {
      type: DataTypes.DATE,
      validate: { isDate: true },

    },
    idleTimes: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      validate: {
        isArrayOfInts(value) {
          if (!Array.isArray(value) || typeof value[value.length - 1] !== "number") throw new Error('Must be an array of integers.');
        }
      }
    },
    avgIdleTime: {
      type: DataTypes.INTEGER,
      validate: { isNumeric: true },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new',
      validate: {
        isAlpha: true,
        isIn: ['new', 'active', 'idle']
      }
    }
  }, {
    sequelize,
    modelName: 'member',
  });

  return member;
};
