const express = require("express");
const router = express.Router();
const dataGenerator = require('../util/dataGenerator');

router.get("/faker", (req, res) => {
  const jsonData = req.body;

  try {
    const data = dataGenerator.generateData(jsonData);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error generating data:", error);
    if (error.message.includes("Invalid data type")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred while generating data." });
    }
  }
  
});



module.exports = router;
