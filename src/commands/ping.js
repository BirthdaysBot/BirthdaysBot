const { MessageEmbed } = require("discord.js");
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

            const embed = new MessageEmbed()
                .setTitle(":ping_pong: Pong!")
                .setDescription(`WebSocket Ping: ${client.ws.ping} ms\nDatabase Ping: ${dateAfter - dateNow} ms`);

            message.reply({ embeds: [embed] });
        }).catch(error => {
            console.log(error);

            const embed = new MessageEmbed()
                .setTitle(":ping_pong: Pong!")
                .setDescription(`WebSocket Ping: ${client.ws.ping} ms\nDatabase Ping: Error`);

            message.reply({ embeds: [embed] });
        });
    }
}