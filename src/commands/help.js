const { MessageEmbed, Collection } = require("discord.js");

module.exports = new Command({
    name: "help",
    description: "Shows the help menu for the bot.",
    cooldown: 2000,
    adminOnly: false,
    ownerOnly: false,
    type: "BOTH",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        /**
         * @type {Collection}
         */
        const commands = client.commands;

        let content = "";

        const options = args.join(' ').split(/--|—/);

        const flags = [];

        options.forEach(option => {
            if (option.trim().split(' ')[0] == 'admin') {
                flags.push("admin");
            }
        });

        if (flags.includes("admin")) {
            const guild = await client.guilds.fetch("933126721237028884");
            const role = await guild.roles.fetch("933127932359082095");

            if (role.members.has(message.author.id || message.user.id)) {
                commands.forEach(command => {
                    if (command.adminOnly != true) return;
                    content += `${client.globalConfig.PREFIX}${command.name} - ${command.description}\n`;
                });

                const embed = new MessageEmbed()
                    .setTitle(":birthday: BirthdaysBot Help Menu")
                    .setThumbnail(client.user.avatarURL())
                    .setColor("RANDOM")
                    .setDescription(`\`\`\`\n${content}\`\`\``)

                message.reply({ embeds: [embed] });
            }
        } else if (flags.length == 0) {
            commands.forEach(command => {
                if (command.adminOnly == true) return;
                content += `${client.globalConfig.PREFIX}${command.name} - ${command.description}\n`;
            });

            const embed = new MessageEmbed()
                .setTitle(":birthday: BirthdaysBot Help Menu")
                .setThumbnail(client.user.avatarURL())
                .setColor("RANDOM")
                .setDescription(`\`\`\`\n${content}\`\`\``)

            message.reply({ embeds: [embed] });
        }
    }
});