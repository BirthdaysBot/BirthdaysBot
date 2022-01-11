const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows the help menu for the bot.",
    adminOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        /**
         * @type {Discord.Collection}
         */
        const commands = client.commands;

        let content = "";

        commands.forEach(command => {
            if (command.adminOnly == true) return;
            content += `${client.globalConfig.PREFIX}${command.name} - ${command.description}\n`;
        });

        const embed = new Discord.MessageEmbed();

        embed.setTitle(":birthday: BirthdaysBot Help Menu");
        embed.setThumbnail(client.user.avatarURL());
        embed.setColor("RANDOM");
        embed.setDescription(`\`\`\`\n${content}\`\`\``);

        message.reply({ embeds: [embed] });
    }
}