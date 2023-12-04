// Import modules
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// Create app and define port number
const app = express();
const port = 3011;

// Configure static files
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Redirect to dog photo generator
app.get("/generate", (req, res) => {
    res.render("generator.ejs");
});

// Listen to the port 
app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});