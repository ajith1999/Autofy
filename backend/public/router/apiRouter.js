const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const jsonData = req.body;

  console.log(jsonData.content); // Array of content objects
  console.log(jsonData.rows); // 100
  console.log(jsonData.downloadType); // null

  res.status(200).json({ string: "Hello" });
});

module.exports = router;
