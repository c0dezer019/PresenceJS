'use strict'
const { Model } = require('sequelize');
const { timeIdle } = require('../../utils/calculate');
const settings = JSON.stringify(require('../../utils/settings'));

module.exports = (sequelize, DataTypes) => {
  class guild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get idleStr() { return timeIdle(this.lastActiveTs) }

    static associate(models) {
      models.guild.belongsToMany(models.member, { through: 'membersGuilds', onDelete: 'CASCADE' });
    }
  }
  guild.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        max: 30,
      }
    },
    snowflakeID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: { isNumeric: true }
    },
    memberCount: {
      type: DataTypes.INTEGER,
    },
    lastActiveTs: {
      type: DataTypes.DATE,
      validate: { isDate: true },
    },
    lastActiveChannel: {
      type: DataTypes.BIGINT,
      validate: { isNumeric: true },
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
    settings: {
      type: DataTypes.JSON,
      defaultValue: settings,
      validate: {
        isJSON (value) {
          if (typeof value !== 'string') throw new Error('Must be in JSON format.');
          try {
            const json = JSON.parse(value);
            return (typeof json === 'object');
          }
          catch (err) {
            throw new Error('Invalid JSON.');
          }
        }
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new',
      validate: {
        isAlpha: true,
        isIn: ['new', 'active', 'idle'],
      }
    },
  }, {
    sequelize,
    modelName: 'guild',
  });
  return guild;
};
