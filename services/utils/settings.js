require('dotenv').config();

// Activity gauges are experimental.
module.exports = {
  bot_owner: process.env.BOT_OWNER,
  veryActive: [0, 30], // hours, minutes. Guild is considered very active when avg is within specified range.
  active: [1, 0],
  moderatelyActive: [3, 0],
  onItsWayOut: [24, 0],
  dead: [48, 0]
};
