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

// Searching dogs
app.get("/search-dog", async (req, res) => {
    try {       
        const result = await axios.get(BASE_API+"breed/"+req.query["dog-name"]+"/images");
        // Generate random number for message array
        const randomNumber = Math.floor(Math.random() * result.data.message.length);
        console.log(result.data.message.length)
        res.render("dog-list.ejs", {
            content: result.data.message[randomNumber],
        })
    } catch (error) {
        res.render("dog-list.ejs", {content: JSON.stringify(error.response.data)})
    }

    res.render("dog-list.ejs")
});

// Listen to the port 
app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});