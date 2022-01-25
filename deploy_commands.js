import dotenv from 'dotenv';
import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

dotenv.config();

const global = [];
const guild = [];
const globalCmds = fs.readdirSync('./services/commands/global').filter(file => file.endsWith('.js'));
const guildCmds = fs.readdirSync('./services/commands/guild').filter(file => file.endsWith('.js'));

for (const file of globalCmds) {
    const cmd = require(`./services/commands/global/${file}`);
    global.push(cmd.data.toJSON());
}

for (const file of guildCmds) {
    const cmd = require(`./services/commands/guild/${file}`);
    guild.push(cmd.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: guild })
    .then(() => console.log("Successfully registered guild commands."))
    .catch(console.error);
