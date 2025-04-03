const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vvinayvamsi:123123@online-voting.k20op.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose;





