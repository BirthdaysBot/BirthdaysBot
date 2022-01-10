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
    name: "add-dataset",
    description: "Adds a birthday to the bot.",
    adminOnly: true,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        if (message.author.id != "716761186812821604") return;
        const userId = args[0];
        const day = args[1];
        const month = args[2];
        const year = args[3] || "0000";

        if (!userId) return message.reply("Please input a user ID.");
        if (!day || isNaN(parseInt(day))) return message.reply("Please input a day. ex: 23");
        if (!month || !months[month.toLowerCase()]) return message.reply("Please input a month. ex: July");

        const findBirthday = await Birthday.findOne({ user_id: userId });

        if (findBirthday) {
            return message.reply("The birthday is already saved in the bot!");
        } else {
            new Birthday({
                user_id: userId,
                user_name: (async () => {
                    let user = client.users.cache.get(userId);

                    if (!user) {
                        await client.users.fetch(userId).then(user => {
                            user = user;
                        });

                        return user.username;
                    } else {
                        return user.username;
                    }
                })(),
                day: parseInt(day),
                month: months[month.toLowerCase()],
                year: parseInt(year)
            }).save().then(document => {
                const embed = new Discord.MessageEmbed();

                embed.setTitle(":birthday: Birthday added!");
                embed.setThumbnail(client.user.avatarURL());
                embed.setColor("RANDOM");
                embed.setDescription(`A new birthday has been added to the bot for ${document.user_name}!\n\n${document.day} ${toUpper(month)}, ${document.year}`);
                embed.setTimestamp();

                message.reply({ embeds: [embed] });
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