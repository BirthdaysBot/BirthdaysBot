const { Client, Message } = require("discord.js");
const isSlashCommand = require("../functions/isSlashCommand");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client The Discord client.
     * @param {Message} message The message.
     * @returns 
     */
    run: async (client, message) => {
        if (!message.content.startsWith(client.globalConfig.PREFIX)) return;
        if (message.channel.type != "GUILD_TEXT") return;
        if (!message.guild.me.permissions.has("SEND_MESSAGES") || !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        const args = message.content.slice(client.globalConfig.PREFIX.length).trim().split(" ");
        const command = args.shift().toLowerCase();

        const fetchedCommand = client.commands.get(command);

        if (!fetchedCommand) return;

        if (["BOTH", "TEXT"].includes(fetchedCommand.type)) {
            client.commands.get(command).run(client, message, args, isSlashCommand);
        }
    }
}