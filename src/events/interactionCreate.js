const {Client, Interaction} = require("discord.js");
module.exports = {
    name: "interactionCreate",
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {Array} args 
     */
    run: async (client, interaction, args) => {
        if (!interaction.inGuild()) return;

        if (interaction.isCommand()) {
            const COMMAND_NAME = interaction.commandName;

            try {
                require(`../commands/${COMMAND_NAME}`).run(client, interaction, interaction.options);
            } catch (error) {
                interaction.reply("An error occured while trying to execute the slash command.");
            }
        }
    }
}