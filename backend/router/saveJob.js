const saveJob = require("../model/saveJob");
const express = require('express')
const router = express.Router()
const { authenticate } = require("../middleware/authMiddleware");
router.post("/saveJob", authenticate, async (req, res) => {
    try {
        const { jobId } = req.body
        const userId = req.userId
        const saveJob2 = await saveJob.findOne({ jobId, userId })
        if (saveJob2) {
            await saveJob2.deleteOne()
            return res.status(200).json({ message: "Job unsaved successfully" })
        }
        const saveJob1 = new saveJob({
            jobId,
            userId
        })
        await saveJob1.save()
        res.status(200).json({ message: "Job saved successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/saveJob", authenticate, async (req, res) => {
    try {
        const userId = req.userId
        const saveJob1 = await saveJob.find({ userId }).populate("jobId", "jobTitle companyName location jobType salary salaryType")
        res.status(200).json(saveJob1)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router