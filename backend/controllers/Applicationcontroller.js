const Application =
  require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const application =
      await Application.create({
        userId: req.user.id,
        jobId: req.body.jobId
      });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.myApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find({
        userId: req.user.id
      }).populate("jobId");

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};