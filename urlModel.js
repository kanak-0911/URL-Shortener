const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortId: {
        type: String,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;