'use strict';
const {
  Model
} = require('sequelize');
const { timeIdle } = require("../../utils/calculate");
module.exports = (sequelize, DataTypes) => {
  class node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      models.node.belongsTo(models.member, { onDelete: 'CASCADE' } );
    }
  }
  node.init({
    guildSnowflakeID: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    memberSnowflakeID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: { isNumeric: true, notNull: true },
    },
    nickname: {
      type: DataTypes.STRING,
      defaultValue: this.username,
    },
    botAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBool(value) {
          if (typeof value !== 'boolean') throw new Error('Value must be either true or false.');
        }
      }
    },
    awol: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBool(value) {
          if (typeof value !== 'boolean') throw new Error('Value must be either true or false.');
        }
      }
    },
    exempt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBool(value) {
          if (typeof value !== 'boolean') throw new Error('Value must be either true or false.');
        }
      }
    },
    reasonExempt: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 50],
        is: /^[a-z_,.\-0-9]+$/i,
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new',
      validate: {
        isAlpha: true,
        isIn: ['new', 'active', 'idle']
      }
    },
    idleTimes:{
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      validate: {
        isArrayOfInts(value) {
          if (!Array.isArray(value) || typeof value[value.length - 1] !== "number") throw new Error('Must be an array of integers.');
        }
      }
    },
    lastActiveTs: {
      type: DataTypes.DATE,
      validate: { isDate: true },
    },
    idleString: {
      type: DataTypes.VIRTUAL,
      get() {
        return timeIdle(this.lastActiveTs);
      },
      set() {
        throw new Error('idleString is not settable.');
      },
    },
    avgIdleTime: {
      type: DataTypes.INTEGER,
      validate: { isNumeric: true },
    },
    lastActiveChannel: {
      type: DataTypes.BIGINT,
      validate: { isNumeric: true, min: 17 }
    },
    memberId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      validate: { isNumeric: true },
    },
  }, {
    sequelize,
    modelName: 'node',
  });
  return node;
};
