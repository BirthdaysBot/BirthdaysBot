const Discord = require("discord.js");
const Birthday = require("../models/Birthday");

module.exports = {
    name: "delete-birthday",
    description: "Deletes your birthday from the bot.",
    adminOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const findBirthday = await Birthday.findOne({ user_id: message.author.id });

        if (!findBirthday) {
            message.reply("You don't have a birthday in this bot.");
        } else {
            await Birthday.findOneAndDelete({ user_id: message.author.id }).then(() => {
                message.reply("Woohoo! You successfully deleted your birthday from the bot.");
            });
        }
    }
}