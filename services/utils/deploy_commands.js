require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const global = [];
const guild = [];
const globalCmds = fs.readdirSync('../commands/global').filter(file => file.endsWith('.js'));
const guildCmds = fs.readdirSync('../commands/guild').filter(file => file.endsWith('.js'));

for (const file of globalCmds) {
    const cmd = require(`../commands/global/${file}`);
    global.push(cmd.data.toJSON());
}

for (const file of guildCmds) {
    const cmd = require(`..commands/guild/${file}`);
    guild.push(cmd.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: guild })
    .then(() => console.log("Successfully registered guild commands."))
    .catch(console.error);
