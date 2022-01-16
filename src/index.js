const { ShardingManager } = require("discord.js");

const Config = require("./config.json");

const Manager = new ShardingManager("./src/bot.js", { token: Config.BOT_TOKEN, totalShards: 1 });

Manager.on("shardCreate", (shard) => {
    console.log(`[SHARD - ${shard.id}] Launched`);

    shard.on("ready", () => {
        console.log(`[SHARD - ${shard.id}] Ready`);
    });

    shard.on("error", (error) => {
        console.log(`[SHARD - ${shard.id}] Error: ${error}`);
    });

    shard.on("disconnect", () => {
        console.log(`[SHARD - ${shard.id}] Disconnected`);
    });
});

Manager.spawn();