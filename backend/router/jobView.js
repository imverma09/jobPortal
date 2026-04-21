const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const JobView = require("../model/jobView");
const Jobs =  require("../model/job");

router.get("/:jobId", authenticate, async (req, res) => {
  try {
    let jobId = req.params.jobId;
    let ipAddress = req.socket.remoteAddress;
    let userId = req.userId;
    let isExisting = await JobView.findOne({ jobId, ipAddress, userId });
    if (!isExisting) {
      await JobView.create({ jobId, ipAddress, userId });
      await Jobs.findByIdAndUpdate(jobId, { $inc: { views: 1 } });
    }
    res.status(200).json({ message: "Job view recorded successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
