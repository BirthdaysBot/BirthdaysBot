const Mongoose = require("mongoose");

const GuildMemberSchema = new Mongoose.Schema({
    user_id: { type: Mongoose.SchemaTypes.String },
    guild_id: { type: Mongoose.SchemaTypes.String },
    message_count: { type: Mongoose.SchemaTypes.Number }
});

module.exports = Mongoose.model("guild_member", GuildMemberSchema);