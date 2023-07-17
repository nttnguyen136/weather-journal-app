// Setup empty JS object to act as endpoint for all routes
projectData = {};
const PORT = 8080;

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/projectData", (_, res) => {
  console.log("[GET] projectData", projectData);

  res.status(200).send(projectData);
});

app.post("/projectData", (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };

  console.log("[POST] projectData", projectData);

  res.status(200).send({
    success: true,
    message: "Data saved successfully",
    data: projectData,
  });
});

// Setup Server
app.listen(PORT, () => {
  console.log("Server running...");
  console.log(`Running on localhost: ${PORT}`);
});
