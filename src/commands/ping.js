const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Shows the bot's ping.",
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        message.reply(`:ping_pong: Pong! ${client.ws.ping} ms.`);
    }
}