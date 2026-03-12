const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// @route   GET /api/jobs
// @desc    Get all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/jobs
// @desc    Post a new job
router.post("/", async (req, res) => {
    const { title, description, company, location, salary } = req.body;

    if (!title || !description || !company || !location) {
        return res.status(400).json({ message: "Please include all required fields" });
    }

    const newJob = new Job({
        title,
        description,
        company,
        location,
        salary,
    });

    try {
        const job = await newJob.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
