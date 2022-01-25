'use strict';

const { Model } = require('sequelize');
const { timeIdle } = require('../../utils/calculate.js');

module.exports = (sequelize, DataTypes) => {
  class guild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.guild.belongsToMany(models.member, { through: "membersGuilds" });
    }
  }
  guild.init({
    guild: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        min: 2,
        max: 30,
      }
    },
    guildId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: { isNumeric: true, min: 17 }
    },
    lastActiveTs: {
      type: DataTypes.DATE,
      validate: { isDate: true },
      get() { return timeIdle(this.getDataValue('lastActiveTs')) },
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
      validate: { isNumeric: true },
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
    },
  }, {
    sequelize,
    modelName: 'guild',
  });
  return guild;
};
