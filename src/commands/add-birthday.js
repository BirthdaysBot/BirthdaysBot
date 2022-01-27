const { Client, Message, MessageEmbed, CommandInteraction, CommandInteractionOptionResolver } = require("discord.js");
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

const flags = {
    "global": true,
    "guild": false,
}

module.exports = {
    name: "add-birthday",
    description: "Adds your birthday to the bot.",
    adminOnly: false,
    type: "TEXT",
    slashCommandOptions: [
        {
            name: "day",
            description: "The day you were born.",
            required: true,
            type: "INTEGER"
        },
        {
            name: "month",
            description: "The month you were born.",
            required: true,
            type: "STRING"
        },
        {
            name: "year",
            description: "The year you were born.",
            required: false,
            type: "INTEGER"
        },
        {
            name: "flag",
            description: "The flag you want to choose.",
            required: false,
            choices: [
                {
                    name: "global birthday (all servers will see this)",
                    value: "global"
                },
                {
                    name: "guild birthday (for this server only)",
                    value: "guild"
                }
            ]
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Message | CommandInteraction} message 
     * @param {Array | CommandInteractionOptionResolver} args 
     * @param {Function} isSlashCommand
     * @returns 
     */
    run: async (client, message, args, isSlashCommand) => {
        if (!isSlashCommand()) {
            const example = "Format: !add-birthday <day, ex: 23> <month, ex: July> <year, optional>";
            const findBirthday = await Birthday.findOne({ user_id: message.author.id }).catch(error => {
                console.log(error);

                return message.reply("An error occured, please try again later.");
            });

            if (findBirthday) {
                return message.reply("Your birthday is already saved in the bot!");
            } else {
                const day = args[0];
                const month = args[1];
                let year = args[2];
                const flag = args[3] || "global";

                if (!day || isNaN(parseInt(day)) || parseInt(day) > 31) return message.reply(example);
                if (!month || !months[month.toLowerCase()]) return message.reply(example);
                if (year) {
                    if (isNaN(parseInt(year))) return message.reply("The year must be a number." + "\n\n" + example);
                    if (parseInt(year) > 2022 || parseInt(year) < 1982) return message.reply("The year cannot be greater than 2022 or less than 1982.");
                } else {
                    year = "0000";
                }
                if (flag) {
                    if (!flags[flag.toLowerCase()]) return message.reply("Please provide a valid flag. (global or guild)");
                }

                const filter = (m) => m.author.id == message.author.id;

                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                message.reply("The bot will be storing your birthday in its database. To remove it from the bot's database run `!delete-birthday`.\n\nAre you sure you want to proceed? (`Yes`/`No`)\nThis message expires in 30 seconds.");

                collector.on("collect", (m) => {
                    if (m.content.toLowerCase() == "yes") {
                        new Birthday({
                            user_id: message.author.id,
                            user_name: message.author.username,
                            day: parseInt(day),
                            month: months[month.toLowerCase()],
                            year: parseInt(year),
                            global_birthday: flags[flag.toLowerCase()]
                        }).save().then(document => {
                            const embed = new MessageEmbed()
                                .setTitle(":birthday: Birthday added!")
                                .setThumbnail(client.user.avatarURL())
                                .setColor("RANDOM")
                                .setDescription(`A new birthday has been added to the bot for ${message.author.username}!\n\n${document.day} ${toUpper(month)}, ${document.year}`)
                                .setTimestamp()

                            message.reply({ embeds: [embed] });
                        }).catch(error => {
                            console.log(error);
                            message.reply("An error occured while trying to save your birthday to the bot's database, please try again later.");
                        });

                        collector.stop();
                    } else {
                        message.reply("Canceled!");
                        collector.stop();
                        return;
                    }
                });
            }
        } else if (isSlashCommand()) {
            const findBirthday = await Birthday.findOne({ user_id: message.author.id }).catch(error => {
                console.log(error);

                return message.reply("An error occured, please try again later.");
            });

            if (findBirthday) {
                return message.reply("Your birthday is already saved in the bot!");
            } else {
                const day = args.getInteger("day");
                const month = args.getString("month");
                let year = args.getInteger("year") || 0000;
                const flag = args.getString("flag") || "global";

                if (day > 31) return message.reply("The day cannot be larger than 31.");
                if (!months[month.toLowerCase()]) return message.reply("Please provide a valid month.");
                if (year) {
                    if (parseInt(year) > 2022 || parseInt(year) < 1982) return message.reply("The year cannot be greater than 2022 or less than 1982.");
                } else {
                    year = 0000;
                }

                const filter = i => i.user.id == m.user.id;

                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                message.reply("The bot will be storing your birthday in its database. To remove it from the bot's database run `!delete-birthday`.\n\nAre you sure you want to proceed? (`Yes`/`No`)\nThis message expires in 30 seconds.");

                collector.on("collect", (m) => {
                    if (m.content.toLowerCase() == "yes") {
                        new Birthday({
                            user_id: message.author.id,
                            user_name: message.author.username,
                            day: parseInt(day),
                            month: months[month.toLowerCase()],
                            year: parseInt(year),
                            global_birthday: flags[flag.toLowerCase()]
                        }).save().then(document => {
                            const embed = new MessageEmbed()
                                .setTitle(":birthday: Birthday added!")
                                .setThumbnail(client.user.avatarURL())
                                .setColor("RANDOM")
                                .setDescription(`A new birthday has been added to the bot for ${message.user.username}!\n\n${document.day} ${toUpper(month)}, ${document.year}`)
                                .setTimestamp()

                            message.reply({ embeds: [embed] });
                        }).catch(error => {
                            console.log(error);
                            message.reply("An error occured while trying to save your birthday to the bot's database, please try again later.");
                        });

                        collector.stop();
                    } else {
                        message.reply("Canceled!");
                        collector.stop();
                        return;
                    }
                });
            }
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