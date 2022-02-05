const Command = require("../utils/structures/Command");
const { Client, Message, MessageEmbed } = require("discord.js");
const getPaginatedBirthdays = require("../functions/getPaginatedBirthdays");

module.exports = new Command({
    name: "birthdays",
    description: "Shows all the birthdays saved with the bot.",
    cooldown: 3000,
    adminOnly: false,
    ownerOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    /**
     * 
     * @param {Client} client The Discord client.
     * @param {Message} message The message object.
     * @param {String[]} args The array of arguments.
     */
    run: async (client, message, args) => {
        let page = args[0] || 1;

        try {
            const fetched = client.birthdays.fetchAllData();
            let bdays = fetched.sort((a, b) => {
                let n = a.month - b.month;
                if (n !== 0) {
                    return n;
                }

                return a.day - b.day;
            });
            let per_page = 20;
            let total_pages = Math.ceil(bdays.length / per_page);

            if (page > total_pages) page = total_pages;

            const embed = new MessageEmbed()
                .setTitle(":birthday: Birthdays List!")
                .setThumbnail(client.user.avatarURL())
                .setColor("RANDOM")
                .setDescription(getPaginatedBirthdays(page, per_page, fetched, message.author))
                .setFooter({ text: "!birthdays <page number> to see other pages!" })

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            message.reply("An error occured, please try again later.");
        }
    }
});