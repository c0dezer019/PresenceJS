const db = require('../database/models');

module.exports = {
    name: 'guildCreate',
    execute(guild) {
        guild.members.fetch()
            .then(members => {
                members.forEach((key, value) => {
                    db.findOrCreate()
                        .then()
                        .catch()
                })
            })
            .catch(console.error);
    }
}
