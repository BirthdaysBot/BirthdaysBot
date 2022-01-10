const fs = require("fs");

const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Client} client The Discord client.
 */
module.exports = async (client) => {
    const eventFiles = await fs.readdirSync("src/events");

    const events = eventFiles.filter(file => file.endsWith(".js"));

    for (const file of events) {
        const event = require(`../events/${file}`);

        client.on(event.name, event.run.bind(event, client));
    }
}