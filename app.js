// Import modules
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// Create app and define port number
const app = express();
const port = 3011;

// API Configuration 
const BASE_API = "https://dog.ceo/api/";


// Configure static files
app.use(express.static("public"));

// Body-parser configuration
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Redirect to dog photo generator
app.get("/generate", (req, res) => {
    res.render("generator.ejs");
});

// Get random dog image 
app.get("/random-dog", async (req, res) => {
    try {
        const result = await axios.get(BASE_API + "breeds/image/random");
        console.log(result.data)
        res.render("index.ejs", {
            content: result.data,
        })
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

// Listen to the port 
app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});