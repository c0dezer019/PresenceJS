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
    static associate(models) {
      models.member.belongsToMany(models.guild, { through: "membersGuilds" });
    }
  }
  member.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        min: 2,
        max: 32,
        isAlphanumeric: true,
      },
      get() {
        const id = this.getDataValue('memberId');
        const tag = this.getDataValue('tag');
        return this.getDataValue('username') + '#' + tag + ' (' + id + ')';
      }
    },
    tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        min: 4,
        isNumeric: true,
      }
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        min: 17,
        isWithinRange(value) {
          new Date()
        }
      }
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
      get() { return timeIdle(this.getDataValue('lastActiveTs')) }
    },
    idleTimes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        isArrayOfInts(value) {
          if (!Array.isArray(value) || typeof value[value.length - 1] !== "number") throw new Error('Must be an array of integers.');
        }
      }
    },
    avgIdleTime: {
      type: DataTypes.INTEGER,
      validate: { isNumeric: true }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'new',
      validate: {
        isAlpha: true,
        isValidStatus(value) {
          if (value !== 'new' || value !== 'active' || value !== 'inactive') throw new Error('Status must be either ' +
              '"new", "active", or "inactive"');
        }
      }
    }
  }, {
    sequelize,
    modelName: 'member',
  });

  return member;
};
