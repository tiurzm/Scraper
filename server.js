const express = require("express"); 
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio"); 
const db = require("./models");
const PORT = 3000;
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(MONGODB_URI);

// ROUTE FOR GETTING ALL ARTICLES
app.get("/articles", function(req, res) {
    axios.get("").then(function(response) {

    });
});

