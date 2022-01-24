const Mongoose = require("mongoose");

/**
 * 
 * @param {String} uri The connection string used to connect to the Mongo database.
 */
module.exports = async (uri) => {
    await Mongoose.connect(uri)
        .then(() => {
            console.log(`[DATABASE] Connected`);
        })
        .catch(error => console.log(error));
}