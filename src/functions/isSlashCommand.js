const { Message, CommandInteraction } = require("discord.js");

module.exports = (command) => {
    if (command instanceof Message) return false;
    if (command instanceof CommandInteraction) return true;
}