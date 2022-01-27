const { MessageEmbed } = require("discord.js");
const Birthday = require("../models/Birthday");

module.exports = {
    name: "ping",
    description: "Shows the bot's ping.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const then = Date.now();

        let msg = await message.reply({ content: "Pinging..." });

        const ping = Math.round(Date.now() - then);

        const MongoThen = Date.now();

        await Birthday.findOne({ userID: null });

        const MongoPing = Math.round(Date.now() - MongoThen);

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`WS Ping: ${client.ws.ping} ms\nAPI Ping: ${ping} ms\nDatabase Ping: ${MongoPing} ms`)

        message.commandName ? message.editReply({ content: " ", embeds: [embed] }) : msg.edit({ content: " ", embeds: [embed] });
    }
}