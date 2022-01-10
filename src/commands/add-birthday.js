const Discord = require("discord.js");
const Birthday = require("../models/Birthday");

const months = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12
}

module.exports = {
    name: "add-birthday",
    description: "Adds your birthday to the bot.",
    adminOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const day = args[0];
        const month = args[1];
        const year = args[2] || "0000";

        if (!day || isNaN(parseInt(day))) return message.reply("Please input a day. ex: 23");
        if (!month || !months[month.toLowerCase()]) return message.reply("Please input a month. ex: July");

        const findBirthday = await Birthday.findOne({ user_id: message.author.id });

        if (findBirthday) {
            return message.reply("Your birthday is already saved in the bot!");
        } else {
            new Birthday({
                user_id: message.author.id,
                user_name: message.author.username,
                day: parseInt(day),
                month: months[month.toLowerCase()],
                year: parseInt(year)
            }).save().then(document => {
                const embed = new Discord.MessageEmbed();

                embed.setTitle(":birthday: Birthday added!");
                embed.setThumbnail(client.user.avatarURL());
                embed.setColor("RANDOM");
                embed.setDescription(`A new birthday has been added to the bot for ${message.author.username}!\n\n${document.day} ${toUpper(month)}, ${document.year}`);
                embed.setTimestamp();

                message.reply({ embeds: [embed] });
            }).catch(error => {
                message.reply("An error occured while trying to save your birthday to the bot's database, please try again later.");
            });
        }
    }
}

/**
 * 
 * @param {String} str A string.
 * @returns A string with the first letter of every word capitalized.
 */
function toUpper(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
}