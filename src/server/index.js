function startServer(client) {
    const express = require("express");
    const app = express();
    const PORT = require("../config.json").SERVER_PORT;

    app.get("/", (req, res) => {
        res.send({ error: false, message: "This server is under maintenance." });
    });

    global.discordClient = client;

    app.get("/api", require("./api/manager"));

    app.listen(PORT, () => {
        console.log("[SERVER] Online at Port " + PORT);
    });
}

module.exports = startServer;