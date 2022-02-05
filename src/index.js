const BirthdaysBot = require("./utils/structures/BirthdaysBot");

const client = new BirthdaysBot({ intents: 513 });

client.globalConfig = require("./config.json");

require("./server/index")(client);

client.start(client.globalConfig.BOT_TOKEN);