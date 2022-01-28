const db = require('../database/models');
const s = require('../utils/settings.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;
        if (message.content.startsWith('?')) {
            if (message.author.id !== s.bot_owner) return;
            if (message.content === '?reset') {
                await db.guild.findOrCreate({
                    where: {
                        guild: message.guild.name,
                        snowflakeID: message.guild.id,
                        status: "new",
                    }
                }).then(async ([newGuild, created]) => {
                    if (created) {
                        await message.guild.members.fetch().then(members => {
                            members.forEach(member => {
                                db.member.findOrCreate({
                                    where: {
                                        snowflakeID: member.id,
                                        username: member.user.username,
                                        discriminator: member.user.discriminator,
                                    }
                                })
                                    .then(([newMember, created]) => {
                                        if (created) {
                                            newMember.createNode({
                                                guildSnowflakeID: message.guild.id,
                                                memberSnowflakeID: member.id,
                                                username: member.user.username,
                                                discriminator: member.user.discriminator,
                                                nickname: member.nickname,
                                                botAdmin: member.id === s.bot_owner, // Better functionality to come.
                                            });
                                        }
                                    })
                                    .catch(console.error);
                            });
                        });
                    }
                });
            }
        } else
            message.guild.members.fetch().then(members => {
                members.forEach(member => console.log(member.id))
            });
    }
}

