const Discord = require("discord.js");
const HumanizeDuration = require("humanize-duration");

module.exports = {
    name: "botinfo",
    description: "Shows information about the bot.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed();

        embed.setTitle(":birthday: BirthdaysBot Information!");
        embed.setThumbnail(client.user.avatarURL());
        embed.addFields([
            {
                name: "Developer(s)",
                value: "Microwave#6443, Dotto#8067, Jims#6900",
                inline: true
            },
            {
                name: "Database",
                value: "MongoDB",
                inline: true
            },
            {
                name: "Creation Date",
                value: HumanizeDuration(Date.now() - client.user.createdAt, { round: true }),
                inline: true
            }
        ]);
        embed.setTimestamp();

        message.reply({ embeds: [embed] });
    }
}