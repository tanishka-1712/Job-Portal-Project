const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job =
      await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const jobs = await Job.find({
      title: {
        $regex: keyword,
        $options: "i"
      }
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find()
    .sort({ createdAt: -1 })
    .limit(6);

  res.json(jobs);
};