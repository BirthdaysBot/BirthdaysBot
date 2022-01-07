const fs = require("fs");

const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client The Discord client.
 */
module.exports = async (client) => {
    const commandFiles = await fs.readdirSync("../commands");

    const commands = commandFiles.filter(file => file.endsWith(".js"));

    for (const file of commands) {
        const command = require(`../commands/${file}`);

        client.commands.set(command.name, command);
    }
}