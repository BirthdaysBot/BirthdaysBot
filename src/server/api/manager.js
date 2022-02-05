const { Router } = require("express");
const router = Router();

const { fetchGuildList } = require("../../functions/birthdaysCache");

router.get("/guilds/:guildid/birthday-list", (req, res) => {
    const client = global.discordClient;

    res.send({ data: fetchGuildList(client, req.params.guildid) });
});

module.exports = router;