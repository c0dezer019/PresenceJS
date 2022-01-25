const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkpulse')
        .setDescription('Check idle time of user'),
    async execute(interaction) {
        await interaction.channel.send("You look alive to me.");
    }

}
