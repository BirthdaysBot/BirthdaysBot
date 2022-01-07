const Discord = require("discord.js");
const intents = new Discord.Intents(513);
const Client = new Discord.Client({ intents });
const pg = require("pg");

Client.globalConfig = require("./config.json");

const PostgresClient = new pg.Client({
    user: Client.globalConfig.db.user,
    host: Client.globalConfig.db.host,
    database: Client.globalConfig.db.database,
    password: Client.globalConfig.db.password,
    port: Client.globalConfig.db.port
});

Client.commands = new Discord.Collection();
Client.slashCommands = new Discord.Collection();
Client.PostgresClient = PostgresClient;

PostgresClient.connect();

require("./utils/commands")(Client);
require("./utils/events")(Client);

Client.login(Client.globalConfig.BOT_TOKEN);