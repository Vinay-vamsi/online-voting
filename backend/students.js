const mongoose = require("mongoose");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/votingDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to generate roll numbers (Numeric: 01-99)
const generateNumericRollNumbers = (batch, start, end) => {
    let rollNumbers = [];
    for (let i = start; i <= end; i++) {         
        rollNumbers.push(`${batch}ME1A04${String(i).padStart(2, '0')}`);     
    }    
    return rollNumbers;
};

// Function to generate roll numbers (Alphanumeric: A0 to I8)
const generateAlphaNumericRollNumbers = (batch) => {
    let rollNumbers = [];
    const letters = "ABCDEFGHI";
    for (let letter of letters) {
        for (let num = 0; num <= 9; num++) {
            rollNumbers.push(`${batch}ME1A04${letter}${num}`);
        }
    }
    return rollNumbers;
};

// Generate roll numbers for both 2021 and 2022 batches
const rollNumbers = [
    ...generateNumericRollNumbers("21", 1, 99),  // 21ME1A0401 to 21ME1A0499
    ...generateAlphaNumericRollNumbers("21"),    // 21ME1A04A0 to 21ME1A04I8
    ...generateNumericRollNumbers("22", 1, 99),  // 22ME1A0401 to 22ME1A0499
    ...generateAlphaNumericRollNumbers("22")     // 22ME1A04A0 to 22ME1A04I8
];

const seedUsers = async () => {
    try {
        const users = rollNumbers.map(rollNumber => ({ rollNumber }));
        await User.insertMany(users);
        console.log("All roll numbers added successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

seedUsers();