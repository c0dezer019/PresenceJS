const db = require('../database/models');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const cmd = client.commands.get(interaction.commandName);

        if (!cmd) return;

        try {
            await cmd.execute(interaction);
        } catch{
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command', ephemeral: true});
        }
    }
}
