const Birthday = require("../models/Birthday");

/**
 * 
 * @param {String} userId 
 * @returns Mongoose document
*/
module.exports = async (userId) => {
    if (!userId || userId == "") return;

    return await Birthday.findOne({ user_id: userId })
        .then(document => {
            return document;
        });
}