const { Client, Interaction } = require("discord.js");
const isSlashCommand = require("../functions/isSlashCommand");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    run: async (client, interaction) => {
        if (!interaction.inGuild()) return;

        if (interaction.isCommand()) {
            const COMMAND_NAME = interaction.commandName;

            try {
                require(`../commands/${COMMAND_NAME}`).run(client, interaction, interaction.options, isSlashCommand);
            } catch (error) {
                interaction.reply("An error occured while trying to execute the slash command.");
            }
        }
    }
}