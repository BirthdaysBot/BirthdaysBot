const Mongoose = require("mongoose");

const BirthdaySchema = new Mongoose.Schema({
    user_id: { type: Mongoose.SchemaTypes.String },
    user_name: { type: Mongoose.SchemaTypes.String },
    day: { type: Mongoose.SchemaTypes.Number },
    month: { type: Mongoose.SchemaTypes.Number },
    year: { type: Mongoose.SchemaTypes.Number }
});

module.exports = Mongoose.model("birthday", BirthdaySchema);