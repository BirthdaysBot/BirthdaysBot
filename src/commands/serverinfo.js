const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Fetches some information about the server.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const { guild } = message;

        const owner = await guild.fetchOwner()

        const invite = async () => {
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
}
