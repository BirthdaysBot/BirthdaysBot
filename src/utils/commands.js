const fs = require("fs");

const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client The Discord client.
 */
module.exports = async (client) => {
    const COMMAND_FILES = await fs.readdirSync("src/commands").filter(file => file.endsWith(".js"));

    const COMMANDS = COMMAND_FILES.map(file => require(`../commands/${file}`));

    client.commands = COMMANDS
        .filter(command => ["BOTH", "TEXT"].includes(command.type))
        .forEach(command => require(`../commands/${command}`));

    client.slashCommands = COMMANDS
        .filter(command => ["BOTH", "SLASH"].includes(command.type))
        .map(command => ({
            name: command.name.toLowerCase(),
            description: command.description,
            permissions: [],
            options: command.slashCommandOptions,
            defaultPermission: true
        }));
}