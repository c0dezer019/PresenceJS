const db = require('../database/models');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        await db.guild.findOrCreate({
            where: {
                guild: guild.name,
                guildId: guild.id,
                status: "new",
            }
        }).then(console.log);

        await guild.members.fetch().then(members => {
            members.forEach(member => {
                db.member.findOrCreate({
                    where: {
                        memberId: member.id,
                        username: member.user.username,
                        discriminator: member.user.discriminator,
                    }
                }).then(([newMember, created]) => {
                    if (created) {
                        newMember.createNode({
                            memberId: member.id,
                            username: member.user.username,
                            discriminator: member.user.discriminator
                        }).then(console.log);
                    }
                }).catch(console.error);
            })
        })
    }
}
