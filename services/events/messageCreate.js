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
                        name: message.guild.name,
                        snowflakeID: message.guild.id,
                    }
                }).then(async ([newGuild, created]) => {
                        await message.guild.members.fetch().then(members => {
                            members.forEach(async member => {
                               db.member.findOrCreate({
                                   where: {
                                        snowflakeID: member.id,
                                        username: member.user.username,
                                        discriminator: member.user.discriminator,
                                   },
                                   include: [db.node, db.guild],
                                })
                                    .then(async ([newMember, created]) => {
                                        await newGuild.addMember(newMember);

                                        if (created) {
                                            await newMember.createNode({
                                                memberId: newMember.id,
                                                guildSnowflakeID: message.guild.id,
                                                memberSnowflakeID: member.id,
                                                username: member.user.username,
                                                discriminator: member.user.discriminator,
                                                nickname: member.nickname,
                                                botAdmin: member.id === s.bot_owner, // Better functionality to come.
                                            });
                                        } else {
                                            await db
                                                .guild
                                                .findOne({
                                                    where: {
                                                        snowflakeID: message.guild.id,
                                                    },
                                                    include: [{
                                                        model: db.member,
                                                        include: db.node
                                                    }]
                                                })
                                                .then(console.log)
                                                .catch(console.error)
                                        }
                                    })
                                    .catch(console.error);
                            });
                        });
                });
            }
        } else
            message.guild.members.fetch().then(members => {
                members.forEach(member => console.log(member.id))
            });
    }
}

