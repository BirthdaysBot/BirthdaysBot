const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Fetches some information about the server.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .setDescription(`Owned by ${await message.guild.fetchOwner().username}#${await message.guild.fetchOwner().discriminator}`)
            .addFields([
                {
                    name: "Members",
                    value: `${message.guild.memberCount.toLocaleString()}: Users: ${message.guild.members.cache.filter(member => !member.bot).size.toLocaleString()} Bots: ${message.guild.members.cache.filter(member => member.bot).size.toLocaleString()}`,
                    inline: false
                }
            ])
            .setTimestamp()

        message.reply({ embeds: [embed] });
    }
}