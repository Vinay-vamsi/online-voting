const express = require("express");
const router = express.Router();
const User = require('./../models/User');

router.post("/login", async (req, res) => {
    const { rollNumber } = req.body;

    try {
        let user = await User.findOne({ rollNumber });

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        if (user.Voted) {
            return res.status(403).json({ success: false, message: "You have already voted" });
        }


        res.json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;




