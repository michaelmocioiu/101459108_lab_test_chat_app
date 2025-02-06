const express = require("express");
const GroupMessage = require("../models/GroupMessage");

const router = express.Router();

router.get("/messages/:room", async (req, res) => {
  const messages = await GroupMessage.find({ room: req.params.room }).sort("date_sent");
  res.json(messages);
});

module.exports = router;
