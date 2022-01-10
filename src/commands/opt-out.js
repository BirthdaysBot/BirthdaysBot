const Discord = require("discord.js");
const Birthday = require("../models/Birthday");

module.exports = {
    name: "opt-out",
    description: "Opts your birthday out of the birthday list.",
    adminOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const findBirthday = await Birthday.findOne({ user_id: message.author.id });

        if (!findBirthday) {
            return message.reply("You don't have a birthday saved in the bot!");
        } else {
            const enabled = args[0];

            if (!enabled || !["yes", "no"].includes(enabled)) return message.reply("Please input `yes` or `no`.");

            if (enabled == "yes") {
                Birthday.findOneAndUpdate({ user_id: message.author.id }, {
                    opted_out: true
                }, function (error, document) {
                    message.reply("You're now opted out of the birthdays list.");
                });
            } else if (enabled == "no") {
                await Birthday.findOneAndUpdate({ user_id: message.author.id }, {
                    opted_out: false
                }, function (error, document) {
                    message.reply("You're now opted in to the birthdays list.");
                });
            }
        }
    }
}