const fs = require("fs");

const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client The Discord client.
 */
module.exports = (client) => {
    client.commands = Discord.Collection();

    const COMMAND_FILES = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

    const COMMANDS = COMMAND_FILES.map(file => require(`../commands/${file}`));

    COMMANDS
        .filter(command => ["BOTH", "TEXT"].includes(command.type))
        .forEach(command => client.commands.set(command.name, require(`../commands/${command.name}`)));

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