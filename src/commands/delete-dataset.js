const Discord = require("discord.js");
const Birthday = require("../models/Birthday");

module.exports = {
    name: "delete-dataset",
    description: "Deletes a birthday from the bot.",
    adminOnly: true,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        if (message.author.id != "716761186812821604") return;
        const userId = args[0];

        if (!userId) return message.reply("Please input a user ID.");

        const findBirthday = await Birthday.findOne({ user_id: userId }).catch(error => {
            console.log(error);

            return message.reply("An error occured, please try again later.");
        });

        if (!findBirthday) {
            return message.reply("The birthday does not exist in the bot's database!");
        } else {
            await Birthday.findOneAndDelete({ user_id: userId }).then(() => {
                const embed = new Discord.MessageEmbed();

                embed.setTitle(":birthday: Birthday deleted!");
                embed.setThumbnail(client.user.avatarURL());
                embed.setColor("RANDOM");
                embed.setDescription(`The requested birthday has been deleted.`);
                embed.setTimestamp();

                message.reply({ embeds: [embed] });
            }).catch(error => {
                console.log(error);

                return message.reply("An error occured, please try again later.");
            });
        }
    }
}