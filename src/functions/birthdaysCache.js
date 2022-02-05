const Cache = require("../utils/structures/Cache");

function fetchGuildList(client, guildId) {
    const array = [];

    array.push(...client.birthdaysCache.fetchAllData());

    return array
        .filter(x => x.guild_id == guildId)
        .sort((a, b) => {
            let n = a.month - b.month;

            if (n != 0) {
                return n;
            }

            return a.day - b.day;
        });
}

module.exports = {
    fetchGuildList
}