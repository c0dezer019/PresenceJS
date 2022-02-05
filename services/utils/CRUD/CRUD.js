const db = require('../../database/models');
const s = require('../../utils/settings');

/*
* The intention of this is to create a contextual way for performing CRUD operations. If it doesn't exist, create it.
* If it exists, update it if values differ from existing. If the provided details match, return it. Return model after
* operations. The only thing it will not do is automatically destroy model instances.
* */

class CRUD {
    // Update
    async update(updateValues) {
        try {
            await this.transaction.update(updateValues);
        } catch (e) {
            console.error(e);
        }

        return this;
    }

    // Delete
    async destroy() {
        try {
            await this.transaction.destroy();
        } catch (e) {
            console.error(e);
        }
    }

    // Create/Read

    async guild(guild) {
        if (guild.constructor.name === 'Guild') {
            await db
                .guild
                .findOrCreate({
                    where: {
                        snowflakeID: guild.id,
                    },
                    include: [{
                        model: db.member,
                        include: db.node,
                    }]
                })
                .then(async ([_guild, created]) => {
                    if (created) {

                        await guild.members.fetch().then(members => {
                            members.forEach(member => this.member(member));
                        });

                        await _guild.update({
                            name: guild.name,
                            memberCount: guild.memberCount,
                        });
                    }
                    this.transaction = _guild;
                })
                .catch(console.error);
        } else {
            throw new Error('Must be a Guild object. Received:\n' + guild);
        }

        return this;
    }

    async member(member) {
        if (member.constructor.name === 'GuildMember') {
            await db
                .member
                .findOrCreate({
                    where: {
                        snowflakeID: member.id,
                        username: member.user.username,
                        discriminator: member.user.discriminator,
                    },
                    include: [db.node, db.guild]
                })
                .then(async ([_member, created]) => {
                    if (created) {
                        await _member.createNode({
                            guildSnowflakeID: member.guild.id,
                            memberSnowflakeID: _member.snowflakeID,
                            username: _member.username,
                            discriminator: _member.discriminator,
                            nickname: member.nickname,
                            botAdmin: s.bot_owner === _member.snowflakeID,
                        });

                        try {
                            this._guild.addMember(_member);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    this.transaction = _member;
                })
                .catch(console.error);
        } else {
            throw new Error('Must be a GuildMember.');
        }

        return this;
    }

    async node(obj) {
        db
            .node
            .findOne({
                where: obj
            })
            .then(node => {
                if (node !== null) {
                    this.transaction.model = node;
                } else {
                    // if node isn't found, create it.
                    this.member(obj).create(obj);
                }
            })
    }
}

module.exports = new CRUD()
