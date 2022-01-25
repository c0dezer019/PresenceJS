const db = require('../database/models');
const s = require('../utils/settings.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.content.startsWith('?')) {
            if (message.author.id !== s.bot_owner) return;

            let msg = message.content.split('');
            msg.shift();
            msg = msg.join('');

            if (msg === 'reset') message.channel.send('Reset me will you?!');
        }
    }
}

