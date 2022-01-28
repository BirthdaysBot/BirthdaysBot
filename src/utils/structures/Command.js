const { Client, Message, ApplicationCommandOption } = require("discord.js");

/**
 * The run function for a bot command.
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array} args 
 */
function runFunction(client, message, args) { }

class Command {
    /**
     * Makes a new command.
     * @typedef {"BOTH" | "SLASH" | "TEXT"} CommandType
     * @typedef {{name: String, description: String, cooldown: Number, adminOnly: Boolean, ownerOnly: Boolean, type: CommandType, slashCommandOptions: ApplicationCommandOption[], run: runFunction}} CommandOptions
     * @param {CommandOptions} options The options for the command.
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.adminOnly = options.adminOnly;
        this.ownerOnly = options.ownerOnly;
        this.type = ["BOTH", "SLASH", "TEXT"].includes(options.type) ? options.type : "TEXT";
        this.slashCommandOptions = options.slashCommandOptions;
        this.run = options.run;
    }
}

module.exports = Command;