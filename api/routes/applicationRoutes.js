const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// @route   POST /api/applications
// @desc    Apply for a job
router.post("/", async (req, res) => {
    const { jobId, name, email, resumeLink } = req.body;

    if (!jobId || !name || !email || !resumeLink) {
        return res.status(400).json({ message: "Please include all required fields" });
    }

    const newApplication = new Application({
        jobId,
        name,
        email,
        resumeLink,
    });

    try {
        const application = await newApplication.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
