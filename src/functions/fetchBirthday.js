const Birthday = require("../models/Birthday");

/**
 * 
 * @param {Array} birthdaysCache
 * @param {String} userId 
 * @returns Mongoose document
*/
module.exports = async (birthdaysCache, userId) => {
    if (!birthdaysCache) return new Error("birthdaysCache is a required parameter.");
    if (!userId || userId == "") return new Error("userId is a required parameter.");

    // If you have a better way of doing this then feel free to submit a pull request.

    const index = birthdaysCache.map(function (x) { return x.user_id }).indexOf(userId);

    if (birthdaysCache[index].user_id == userId) {
        return birthdaysCache[index];
    } else {
        const birthday = await Birthday.findOne({ user_id: userId });

        if (!birthday) return {};

        birthdaysCache.push(birthday);

        return birthday;
    }
}