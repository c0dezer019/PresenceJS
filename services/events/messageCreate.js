const s = require('../utils/settings.js');
const crud = require('../utils/CRUD/CRUD');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.content.startsWith('?')) {
            if (message.author.id !== s.bot_owner) return;
            if (message.content === '?reset') {
                await crud.guild(await message.guild);
            } else if(message.content === '?count') {
                console.log(message.guild.constructor.name)
            }
        } else
            await crud.guild(await message.guild).update({
                lastActiveTs: Date.now(),
            })
    }
}

