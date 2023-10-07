const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

//routers
const taskRouter = require("./routes/Tasks");
app.use("/tasks", taskRouter);

db.sequelize.sync().then(() => {
const listener = app.listen(3001, function() {
    console.log("The static server is listening on port " + listener.address().port);
  });
});