const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Candidate = require("../models/Candidate");

router.get("/candidates", async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/vote", async (req, res) => {
    const { rollNumber, headBoyId, headGirlId } = req.body;

    try {
        const user = await User.findOne({ rollNumber });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.voted) {
            return res.status(400).json({ message: "You have already voted!" });
        }

        const headBoy = await Candidate.findById(headBoyId);
        const headGirl = await Candidate.findById(headGirlId);

        if (!headBoy || !headGirl) {
            return res.status(400).json({ message: "Invalid candidate selection" });
        }

        await Candidate.findByIdAndUpdate(headBoyId, { $inc: { votes: 1 } });
        await Candidate.findByIdAndUpdate(headGirlId, { $inc: { votes: 1 } });

        user.voted = true;
        await user.save();

        res.json({ success: true, message: "Vote successfully cast!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/results", async (req, res) => {
    try {
        const results = await Candidate.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;










