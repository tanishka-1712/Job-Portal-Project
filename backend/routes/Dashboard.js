const express = require("express");

const router = express.Router();

const User =
  require("../models/User");

const Application =
  require("../models/Application");

router.get(
  "/:userId",
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.userId
        )
          .populate(
            "savedJobs"
          );

      const applications =
        await Application.find({
          applicantId:
            req.params.userId
        }).populate(
          "jobId"
        );

      res.json({
        profile: user,

        appliedJobs:
          applications,

        stats: {
          totalApplications:
            applications.length,

          savedJobs:
            user.savedJobs
              .length,

          resumeUploaded:
            !!user.resume
        }
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Dashboard Error"
      });

    }
  }
);

module.exports = router;