const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Fetches some information about the server.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed();

        embed.setTitle(`${message.guild.name}`);
        embed.setDescription(`Owned by ${(async () => { let owner = await message.guild.fetchOwner(); return owner; })()}`);
        embed.addFields([
            {
                name: "Members",
                value: `${message.guild.memberCount.toLocaleString()}: Users: ${message.guild.members.cache.filter(member => !member.bot).size.toLocaleString()} Bots: ${message.guild.members.cache.filter(member => member.bot).size.toLocaleString()}`,
                inline: false
            }
        ]);
        embed.setTimestamp();

        message.reply({ embeds: [embed] });
    }
}