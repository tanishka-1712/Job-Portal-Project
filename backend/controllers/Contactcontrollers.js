const Contact =
  require("../models/Contact");

exports.sendMessage = async (
  req,
  res
) => {
  try {
    const contact =
      await Contact.create(req.body);

    res.status(201).json({
      message: "Message sent",
      contact
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};