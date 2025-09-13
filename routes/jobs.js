import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [["createdAt", "DESC"]] });
    res.json(jobs);
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    res.status(500).json({ error: "Internal server error. Check server logs." });
  }
});

// POST new job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(400).json({ error: "Failed to create job" });
  }
});

// GET single job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
