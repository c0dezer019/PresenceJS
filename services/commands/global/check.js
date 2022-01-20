const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription("Check your idle stats."),
    async execute(interaction) {
        await interaction.reply();
    },
};
