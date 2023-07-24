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
    
      res.status(400).json({ error: error.message });
    
     //TODO : handle generic errors 
     // res.status(500).json({ error: "An error occurred while generating data." });
    
  }
  
});



module.exports = router;
