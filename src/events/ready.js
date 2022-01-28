const { Client } = require("discord.js");
const Birthday = require("../models/Birthday");
const connectMongo = require("../utils/connectMongo");

module.exports = {
    name: "ready",
    /**
     * Fires when the Discord client becomes ready.
     * @param {Client} client The Discord client.
     */
    run: async (client) => {
        console.log(`[BOT - ${client.user.tag}] Online`);

        const activities = [
            {
                name: client.globalConfig.PREFIX + "help",
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

        const dbConfig = client.globalConfig.db;

        await connectMongo(`mongodb://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=admin`);

        await cacheBirthdays(client);

        /*let data = {
            id: client.user.id,
            key: client.globalConfig.DBH_API_KEY,
            users: client.users.cache.size.toString(),
            servers: client.guilds.cache.size.toString(),
            clientInfo: client.user
        }*/

        // DanBot API is broken so the code below isn't needed anymore

        /*axios({
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
        });*/
    }
}

/**
 * 
 * @param {Client} client 
 */
async function cacheBirthdays(client) {
    console.log("[BOT] Caching birthdays");

    try {
        const birthdays = await Birthday.find({});

        client.birthdays = birthdays;
    } catch (error) {
        console.log("[BOT] An error occured while attempting to cache birthdays", error);
    }
}