module.exports = {
    name: "interactionCreate",
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