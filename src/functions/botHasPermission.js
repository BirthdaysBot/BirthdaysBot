const { Guild, GuildChannel } = require("discord.js");

/**
 * Checks if the bot has the requested permission in the guild or channel.
 * The function will return `true` if the bot has the permission and `false` if it does not.
 * @param {Guild} guild The guild you want to check in.
 * @param {GuildChannel} channel The channel (if any) that you want to check in.
 * @param {String} permission The permission you are checking for.
 * @returns Boolean
 */
module.exports = (guild, channel, permission) => {
    if (guild.me.permissions.has(permission) || channel.permissionsFor(guild.me).has(permission)) return true;
    else return false;
}