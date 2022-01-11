const Discord = require("discord.js");
const Birthday = require("../models/Birthday");
const getPaginatedBirthdays = require("../getPaginatedBirthdays");

module.exports = {
    name: "birthdays",
    description: "Shows all the birthdays saved with the bot.",
    adminOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    /**
     * 
     * @param {Discord.Client} client The Discord client.
     * @param {Discord.Message} message The message object.
     * @param {String[]} args The array of arguments.
     */
    run: async (client, message, args) => {
        let page = args[0] || 1;

        try {
            const fetched = await Birthday.find({});
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

            const embed = new Discord.MessageEmbed();

            embed.setTitle(":birthday: Birthdays List!");
            embed.setThumbnail(client.user.avatarURL());
            embed.setColor("RANDOM");
            embed.setDescription(getPaginatedBirthdays(page, per_page, fetched, message.author));
            embed.setFooter({ text: "!birthdays <page number> to see other pages!" });

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            message.reply("An error occured, please try again later.");
        }
    }
}