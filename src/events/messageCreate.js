const Discord = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Discord.Client} client The Discord client.
     * @param {Discord.Message} message The message.
     * @returns 
     */
    run: async (client, message) => {
        if (!message.content.startsWith(client.globalConfig.PREFIX)) return;
        if (message.channel.type != "GUILD_TEXT") return;
        if (!message.guild.me.permissions.has("SEND_MESSAGES") || !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        const args = message.content.slice(client.globalConfig.PREFIX.length).trim().split(" ");
        const command = args.shift().toLowerCase();

        if (!client.commands.get(command)) return;

        console.log(`[COMMAND HANDLER - ${Date()}] Guild ID: ${message.guild.id} - User ID: ${message.author.id} - Command: ${command}`);

        if (["BOTH", "TEXT"].includes(client.commands.get(command).type)) {
            client.commands.get(command).run(client, message, args);
        }
    }
}