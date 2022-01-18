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

        const activities = [
            {
                name: "!help",
                type: "LISTENING"
            },
            {
                name: "the birthdays list grow",
                type: "WATCHING"
            },
            {
                name: "the birthdays list",
                type: "STREAMING"
            }
        ];

        const index = Math.floor(Math.random() * activities.length);

        client.user.setActivity(activities[index]);

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