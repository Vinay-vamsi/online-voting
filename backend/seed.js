const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/votingDB", { useNewUrlParser: true, useUnifiedTopology: true });

const Candidate = require("./models/Candidate");

Candidate.insertMany([
    { name: "manish", category: "headboy" },
    { name: "vinay", category: "headboy" },
    { name: "bindu", category: "headgirl" },
    { name: "Suvarna", category: "headgirl" }
]).then(() => {
    console.log("Candidates added!");
    mongoose.connection.close();
}).catch(err => console.error("Error inserting candidates:", err));
