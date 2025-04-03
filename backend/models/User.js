const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    voted: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);









