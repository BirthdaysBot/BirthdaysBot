const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { ApplicationCommandType } = require("discord-api-types");

module.exports = new ContextMenuCommandBuilder()
    .setName("profile")
    .setType(ApplicationCommandType.User);