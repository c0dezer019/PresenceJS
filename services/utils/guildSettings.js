module.exports = {
  autoKick: false, // Automatically kick user when idle time exceeds kickTimer parameters.
  alertUser: true, // Alerts users when they're about to be kicked, or when they exceed allowed idleness.
  dmOrChannel: 'dm', // How will the bot alert the user? Defaults to Direct Message.
  kickTimer: [1, 0], // How long until member has exceeded time allowed idle.
  AWOL: [], // List of member IDs that have exceeded their allowed idleness (only used when autoKick is off).
  exempt: [], // List of member IDs that have been exempted from autoKicking or going AWOL.
}
