const Discord = require("discord.js");
const intents = new Discord.Intents(513);
const Client = new Discord.Client({ intents });

Client.globalConfig = require("./config.json");

require("./utils/commands")(Client);
require("./utils/events")(Client);

Client.login(Client.globalConfig.BOT_TOKEN);