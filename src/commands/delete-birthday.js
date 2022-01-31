const Birthday = require("../models/Birthday");
const Command = require("../utils/structures/Command");

module.exports = new Command({
    name: "delete-birthday",
    description: "Deletes your birthday from the bot.",
    cooldown: 3500,
    adminOnly: false,
    ownerOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const findBirthday = await Birthday.findOne({ user_id: message.author.id }).catch(error => {
            console.log(error);

            return message.reply("An error occured, please try again later.");
        });

        if (!findBirthday) {
            message.reply("You don't have a birthday in this bot.");
        } else {
            await Birthday.findOneAndDelete({ user_id: message.author.id }).then(() => {
                client.birthdays = client.birthdays.filter(birthday => birthday.user_id == message.author.id);
                message.reply("Woohoo! You successfully deleted your birthday from the bot.");
            }).catch(error => {
                console.log(error);

                return message.reply("An error occured, please try again later.");
            });
        }
    }
})