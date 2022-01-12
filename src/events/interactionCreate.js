module.exports = {
    name: "interactionCreate",
    run: async (client, interaction, args) => {
        if (!interaction.inGuild()) return;

        if (interaction.isCommand()) {
            const COMMAND_NAME = interaction.commandName;

            require(`../commands/${COMMAND_NAME}`).run(client, interaction, interaction.options);
        }
    }
}