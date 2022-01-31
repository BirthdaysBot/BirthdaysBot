const { Client, Message, Collection } = require("discord.js");
const Command = require("../utils/structures/Command");
const isSlashCommand = require("../functions/isSlashCommand");
const botHasPermission = require("../functions/botHasPermission");
const HumanizeDuration = require("humanize-duration");

module.exports = {
    name: "messageCreate",
    /**
     * Fires when a message is sent and the bot receives it.
     * @param {Client} client The Discord client.
     * @param {Message} message The message.
     */
    run: async (client, message) => {
        if (!message.content.startsWith(client.globalConfig.PREFIX)) return;
        if (message.channel.type != "GUILD_TEXT") return;
        if (!botHasPermission(message.guild, message.channel, "SEND_MESSAGES")) return;

        const args = message.content.slice(client.globalConfig.PREFIX.length).trim().split(" ");
        const command = args.shift().toLowerCase();

        /**
         * @type {Command}
         */
        const fetchedCommand = client.commands.get(command);

        /**
         * @type {Collection}
         */
        const cooldowns = client.commandCooldowns;

        if (!fetchedCommand) return;

        if (["BOTH", "TEXT"].includes(fetchedCommand.type)) {
            /**
             * @type {Array}
             */
            const ownerIds = client.globalConfig.OWNER_IDS;

            if (fetchedCommand.ownerOnly) {
                if (!ownerIds.includes(message.author.id)) {
                    return message.reply("This command is a bot owner only command!");
                }
            }

            /**
             * @type {Collection}
             */
            const cooldown = cooldowns.get(command);

            const check = cooldown.get(message.author.id);

            if (check) {
                const time = HumanizeDuration(check["started"] - fetchedCommand.cooldown, { round: true });

                return message.reply(`Please wait for the command cooldown to end. ${time}`);
            } else {
                client.commands.get(command).run(client, message, args, isSlashCommand);

                cooldown.set(message.author.id, { started: Date.now() });

                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, fetchedCommand.cooldown);
            }
        }
    }
}