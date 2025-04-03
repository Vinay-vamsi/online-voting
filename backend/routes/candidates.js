const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ["headboy", "headgirl"], required: true },
    votes: { type: Number, default: 0 }  // ✅ Add votes field
});

module.exports = mongoose.model("Candidate", candidateSchema);

