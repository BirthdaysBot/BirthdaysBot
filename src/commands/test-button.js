const { MessageActionRow, MessageButton } = require("discord.js");
const Command = require("../utils/structures/Command");

module.exports = new Command({
    name: "test-button",
    description: "Test Buttons",
    adminOnly: true,
    ownerOnly: true,
    type: "TEXT",
    slashCommandOptions: [],
    run: async (client, message, args) => {
        const row = new MessageActionRow();

        const primary = new MessageButton();

        primary.setCustomId("testButtonPrimary");
        primary.setLabel("Test Button");
        primary.setStyle("PRIMARY");

        const secondary = new MessageButton();

        secondary.setCustomId("testButtonSecondary");
        secondary.setLabel("Test Button");
        secondary.setStyle("SECONDARY");

        const success = new MessageButton();

        success.setCustomId("testButtonSuccess");
        success.setLabel("Test Button");
        success.setStyle("SUCCESS");

        const danger = new MessageButton();

        danger.setCustomId("testButtonDanger");
        danger.setLabel("Test Button");
        danger.setStyle("DANGER");

        const link = new MessageButton();

        link.setLabel("Test Button");
        link.setStyle("LINK");
        link.setURL("https://discord.js.org/")

        row.addComponents([primary, secondary, success, danger, link]);

        message.channel.send({ content: "Hello world!", components: [row] });
    }
});