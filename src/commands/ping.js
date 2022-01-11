const Discord = require("discord.js");
const Birthday = require("../models/Birthday");

module.exports = {
    name: "ping",
    description: "Shows the bot's ping.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const dateNow = Date.now();

        await Birthday.find({}).then(() => {
            const dateAfter = Date.now();

            message.reply(`:ping_pong: Pong!\n\nWebsocket Ping: ${client.ws.ping} ms\nDatabase Ping: ${dateAfter - dateNow} ms`);
        }).catch(error => {
            console.log(error);
            message.reply(`:ping_pong: Pong!\n\nWebsocket Ping: ${client.ws.ping} ms\nDatabase Ping: Error`);
        });
    }
}