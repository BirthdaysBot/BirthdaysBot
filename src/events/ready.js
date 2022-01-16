const Discord = require("discord.js");
const Mongoose = require("mongoose");
const { default: axios } = require("axios");

module.exports = {
    name: "ready",
    /**
     * 
     * @param {Discord.Client} client The Discord client.
     */
    run: async (client) => {
        console.log(`[BOT - ${client.user.tag}] Online`);
        client.guilds.cache.forEach(guild => {
            console.log(`[GUILDS] ${guild.name} - Members: ${guild.memberCount} Bots: ${guild.members.cache.filter(user => !user.bot).size.toLocaleString()}`);
        });

        client.user.setActivity({ name: "!help", type: "LISTENING" });

        await client.application.commands.set(client.slashCommands);

        const dbConfig = client.globalConfig.db;

        await Mongoose.connect(`mongodb://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=admin`)
            .then(() => {
                console.log(`[DATABASE] Connected`);
            })
            .catch(error => console.log(error));

        let data = {
            id: client.user.id,
            key: client.globalConfig.DBH_API_KEY,
            users: client.users.cache.size.toString(),
            servers: client.guilds.cache.size.toString(),
            clientInfo: client.user
        }

        axios({
            method: "POST",
            url: "https://danbot.host/api/bot/" + data.id + "/stats",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log("[DANBOT API] Response: " + response.data.message);
        }).catch(error => {
            console.log("[DANBOT API] Error: " + error.message);
        });
    }
}