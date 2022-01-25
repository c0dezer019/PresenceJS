require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const globalCmds = fs.readdirSync('./services/commands/global').filter(file => file.endsWith('.js'));
const guildCmds = fs.readdirSync('./services/commands/guild').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./services/events').filter(file => file.endsWith('.js'));

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });
client.commands = new Collection();

for (const file of globalCmds) {
    const cmd = require(`./services/commands/global/${file}`);
    client.commands.set(cmd.data.name, cmd);
}

for (const file of guildCmds) {
    const cmd = require(`./services/commands/guild/${file}`);
    client.commands.set(cmd.data.name, cmd);
}

for (const file of events) {
    const event = require(`./services/events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else if (event.name === 'login') {
        event.execute(client);
    }
    else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
