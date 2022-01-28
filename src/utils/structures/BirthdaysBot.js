const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

class BirthdaysBot extends Client {
    /**
     * @typedef {{intents: Number}} ClientOptions
     * @param {ClientOptions} options 
     */
    constructor(options) {
        super({ intents: options.intents });
    }

    /**
     * Starts the Discord bot.
     * @param {String} token The Discord bot token.
     */
    start(token) {
        console.log("[BOT] Starting");

        this.#loadCommands();
        this.#loadEvents();

        this.login(token);

        this.on("ready", () => {
            this.#registerSlashCommands();
            this.#loadContextMenus();
        });
    }

    /**
     * Loads all of the commands for the bot.
     */
    #loadCommands() {
        this.commands = new Collection();

        const COMMAND_FILES = fs.readdirSync(path.join(__dirname, "../../commands")).filter(file => file.endsWith(".js"));

        const COMMANDS = COMMAND_FILES.map(file => require(`../../commands/${file}`));

        COMMANDS
            .filter(command => ["BOTH", "TEXT"].includes(command.type))
            .forEach(command => this.commands.set(command.name, require(`../../commands/${command.name}`)));

        this.slashCommands = COMMANDS
            .filter(command => ["BOTH", "SLASH"].includes(command.type))
            .map(command => ({
                name: command.name.toLowerCase(),
                description: command.description,
                permissions: [],
                options: command.slashCommandOptions,
                defaultPermission: true
            }));

        this.commandCooldowns = new Collection();

        COMMANDS.forEach(command => {
            this.commandCooldowns.set(command.name, new Collection());
        });
    }

    /**
     * Registers all global slash commands for the bot.
     */
    async #registerSlashCommands() {
        await this.application.commands.set(this.slashCommands);
    }

    /**
     * Loads all of the events for the bot.
     */
    async #loadEvents() {
        const eventFiles = await fs.readdirSync("src/events");

        const events = eventFiles.filter(file => file.endsWith(".js"));

        for (const file of events) {
            const event = require(`../../events/${file}`);

            this.on(event.name, event.run.bind(event, this));
        }
    }

    async #loadContextMenus() {
        const contextFiles = await fs.readdirSync("src/menus/context");

        this.contextMenus = contextFiles
            .filter(file => file.endsWith(".js"))
            .map(menu => ({
                name: menu.name,
                type: menu.type
            }))

        const rest = new REST({ version: 9 }).setToken(this.token);

        rest.put(Routes.applicationGuildCommands(this.user.id), {
            body: this.contextMenus
        }).then(() => console.log("Registered context menus.")).catch(error => console.log(error));
    }
}

module.exports = BirthdaysBot;