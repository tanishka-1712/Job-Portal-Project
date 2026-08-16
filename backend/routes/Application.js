const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  applyJob,
  myApplications
} = require(
  "../controllers/applicationController"
);

router.post("/apply", protect, applyJob);

router.get(
  "/my-applications",
  protect,
  myApplications
);

module.exports = router;