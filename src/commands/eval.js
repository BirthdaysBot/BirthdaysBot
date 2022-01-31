const { MessageEmbed } = require("discord.js");
const Birthday = require("../models/Birthday");
const Command = require("../utils/structures/Command");

module.exports = new Command({
    name: "eval",
    description: "Evaluates code.",
    cooldown: 1000,
    adminOnly: true,
    ownerOnly: true,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Please provide a code to evaluate.");
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled);
            }
            if (evaled > 1024) {
                message.reply("Message too big to send.");
            } else {
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
                    .addField("Output", `\`\`\`js\n${evaled.toString().slice(0, 1024)}\n\`\`\``)

                message.channel.send({ embeds: [embed] });
            }
        } catch (error) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .addField("Input", `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                .addField("Output", `\`\`\`js\n${error.message.toString().slice(0, 1024)}\n\`\`\``)
            message.channel.send({ embeds: [embed] });
        }

    }
});