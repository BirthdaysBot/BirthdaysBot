const { Message, CommandInteraction } = require("discord.js");

/**
 * Returns a boolean depending on if the command is a slash command or not, true if it's a slash command 
 * false if it's a normal message/text/prefix command.
 * @param {Message | CommandInteraction} command The command.
 * @returns True or false, depending on whether or not the command is an instance of CommandInteraction.
 */
module.exports = (command) => {
    if (command instanceof Message) return false;
    if (command instanceof CommandInteraction) return true;
}