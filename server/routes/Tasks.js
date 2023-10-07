const express = require('express')
const router = express.Router()

const app = express();
app.use(express.json());
//make the database a variable
const {Tasks} = require("../models")

router.get('/', async(req, res) => {
    const listofTasks = await Tasks.findAll(); 
    res.json(listofTasks);
});

router.post('/', async (req, res) => {
    const post = req.body;
  
    try {
      // Create and insert into the database from the POST request
      await Tasks.create(post);
      res.json(post);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router