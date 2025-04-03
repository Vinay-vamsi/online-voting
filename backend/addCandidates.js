const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/votingDB", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const candidates = [
    { name: "John Doe", category: "headboy", votes: 0 },
    { name: "Alex Smith", category: "headboy", votes: 0 },
    { name: "Emily Johnson", category: "headgirl", votes: 0 },
    { name: "Sophia Brown", category: "headgirl", votes: 0 }
];

// Insert candidates into database
Candidate.insertMany(candidates)
    .then(() => {
        console.log("✅ Candidates added successfully!");
        mongoose.connection.close();  // Close DB connection after inserting
    })
    .catch((err) => console.error("❌ Error inserting candidates:", err));

