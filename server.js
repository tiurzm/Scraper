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
app.get("/scrape", function(req, res) {
    axios.get("https://css-tricks.com/archives/").then(function(response) {
        const $ = cheerio.load(response.data);
        $("article h2").each(function(i, element) {
            let result = {};
            result.title = $(this)
                .children()
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                })
        });
        res.send("Completed");
    });
});


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

