const Birthday = require("../models/Birthday");
const Command = require("../utils/structures/Command");

module.exports = new Command({
    name: "opt-out",
    description: "Opts your birthday out of the birthday list.",
    cooldown: 2000,
    adminOnly: false,
    ownerOnly: false,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        if (message) return;

        const findBirthday = await Birthday.findOne({ user_id: message.author.id }).catch(error => {
            console.log(error);

            return message.reply("An error occured, please try again later.");
        });

        if (!findBirthday) {
            return message.reply("You don't have a birthday saved in the bot!");
        } else {
            const enabled = args[0];

            if (!enabled || !["yes", "no"].includes(enabled)) return message.reply("Please input `yes` or `no`.");

            if (enabled == "yes") {
                update(message, message.author.id, enabled, client);
            } else if (enabled == "no") {
                update(message, message.author.id, enabled, client);
            }
        }
    }
});

function update(message, key, value, client) {
    const vals = {
        "yes": true,
        "no": false
    }

    value = vals[value];

    Birthday.findOneAndUpdate({ user_id: key }, {
        opted_out: value
    }, function (error, document) {
        if (error) console.log(error);
        if (error) return message.reply("An error occured, please try again later.");

        client.birthdays = client.birthdays.filter(birthday => birthday.user_id == key);
        client.birthdays.push(document);

        if (value == true) {
            message.reply("You're now opted out of the birthdays list.");
        } else if (value == false) {
            message.reply("You're now opted in to the birthdays list.");
        }
    }).catch(error => {
        console.log(error);

        return message.reply("An error occured, please try again later.");
    });
}