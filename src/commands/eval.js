const Discord = require("discord.js");
const Birthday = require("../models/Birthday");

module.exports = {
    name: "eval",
    description: "Evaluates code.",
    adminOnly: true,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        if (message.author.id != "716761186812821604") {
            return;
        }

        try {
            let evaled;

            try {
                evaled = await eval(args.join(" "));

                const embed = new Discord.MessageEmbed()
                    .setTitle("Evaluation")
                    .addField("Input", `${args.join(" ")}`)
                    .addField("Output", `${evaled}`)


                message.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                message.reply(`**Error**: ${error.message}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
}

