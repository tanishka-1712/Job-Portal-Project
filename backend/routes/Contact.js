const express = require("express");

const router = express.Router();

const Contact =
  require("../models/Contact");

router.post(
  "/",
  async (req, res) => {

    try {

      const {
        name,
        email,
        subject,
        message
      } = req.body;

      const contact =
        await Contact.create({
          name,
          email,
          subject,
          message
        });

      res.status(201).json({
        success: true,
        message:
          "Message Sent Successfully",
        contact
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Unable to send message"
      });

    }
  }
);

module.exports = router;