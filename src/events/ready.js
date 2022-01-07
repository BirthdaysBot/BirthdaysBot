const Discord = require("discord.js");

module.exports = {
    name: "ready",
    /**
     * 
     * @param {Discord.Client} client The Discord client.
     */
    run: async (client) => {
        client.application.commands.set(client.slashCommands);
    }
}