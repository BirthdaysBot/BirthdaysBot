const fs = require("fs");

const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client The Discord client.
 */
module.exports = async (client) => {
    const commandFiles = await fs.readdirSync("src/commands");

    const commands = commandFiles.filter(file => file.endsWith(".js"));

    for (const file of commands) {
        const command = require(`../commands/${file}`);

        if (command.type == "TEXT") {
            client.commands.set(command.name, command);
        } else if (command.type == "BOTH") {
            client.commands.set(command.name, command);
            client.slashCommands.set(command.name, command);
        } else if (command.type == "SLASH") {
            client.slashCommands.set(command.name, command);
        }
    }
}