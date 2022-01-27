const Mongoose = require("mongoose");

const BirthdaySchema = new Mongoose.Schema({
    user_id: { type: Mongoose.SchemaTypes.String },
    user_name: { type: Mongoose.SchemaTypes.String },
    day: { type: Mongoose.SchemaTypes.Number },
    month: { type: Mongoose.SchemaTypes.Number },
    year: { type: Mongoose.SchemaTypes.Number },
    opted_out: { type: Mongoose.SchemaTypes.Boolean, default: false },
    global_birthday: { type: Mongoose.SchemaTypes.Boolean, default: true },
    guild_id: { type: Mongoose.SchemaTypes.String }
});

module.exports = Mongoose.model("birthday", BirthdaySchema);