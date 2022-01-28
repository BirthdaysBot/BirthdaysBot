const { MessageEmbed } = require("discord.js");
const botHasPermission = require("../functions/botHasPermission");
const Command = require("../utils/structures/Command");

module.exports = new Command({
    name: "serverinfo",
    description: "Fetches some information about the server.",
    adminOnly: false,
    ownerOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const { guild, channel } = message;

        const owner = await guild.fetchOwner()

        const invite = async () => {
            if (!botHasPermission(guild, channel, "MANAGE_GUILD")) return "Insufficient permissions. (Manage Server is required)";

            if (!guild.vanityURLCode) {
                const invites = await guild.invites.fetch();

                const sorted = invites.sort((a, b) => {
                    let n = b.uses - a.uses;

                    if (n != 0) {
                        return n;
                    }
                });

                return sorted.first().code;
            } else {
                return guild.vanityURLCode;
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .setDescription(`Owned by ${owner.user.tag}`)
            .setThumbnail(guild.iconURL())
            .addFields([
                {
                    name: "Members",
                    value: `${guild.memberCount.toLocaleString()}: Users: ${guild.members.cache.filter(member => !member.bot).size.toLocaleString()} Bots: ${guild.members.cache.filter(member => member.bot).size.toLocaleString()}`,
                    inline: false
                },
                {
                    name: "Created",
                    value: `${guild.createdAt}`,
                    inline: false
                },
                {
                    name: "Verified",
                    value: `${guild.verified}`,
                    inline: false
                },
                {
                    name: "Invite",
                    value: `${await invite()}`,
                    inline: false
                }
            ])
            .setTimestamp()

        message.reply({ embeds: [embed] });
    }
});