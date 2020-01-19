const express = require("express"); 
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio"); 
const db = require("./models");
const PORT = 3500;
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(MONGODB_URI);

// ROUTE FOR SCRAPE ALL ARTICLES
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
                });
        });
        res.send("completed");
    });
});

// ROUTE FOR GETTING ALL ARTICLES
app.get("/articles", function(req, res) {
    db.Article
        .find({ isSaved: false})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// ROUTE FOR SAVING ARTICLE TO SAVED ARTICLES
app.post("/saved/:id", function(req, res) {
    db.Article
    .findOneAndUpdate ({ _id: req.params.id }, { isSaved: true })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// ROUTE FOR SAVED ARTICLES
app.get("/saved", function(req, res) {
    db.Article
        .find({ isSaved: true })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// ROUTE FOR REMOVING ARTICLE FROM SAVED ARTICLES
app.post("/remove/:id", function(req, res) {
    db.Article
        .findOneAndUpdate ({ _id: req.params.id }, { isSaved: false })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// ROUTE FOR GRABBING A SPECIFIC ARTICLE'S ASSOCIATED NOTE BY ID
app.get("/articles/:id", function(req, res) {
    db.Article
        .findOne({ _id: req.params.id })
        .populate("notes")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// ROUTE FOR SAVING/UPDATING AN ARTICLE'S ASSOCIATED NOTE
app.post("/articles/:id", function(req, res) {
    db.Note
        .create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: {notes: dbNote._id }});
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// ROUTE FOR DELETE A NOTE
app.delete("/articles/:id", function(req, res) {
    db.Note
        .findOneAndRemove({ _id: req.params.id })
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.article_id }, { $pull: { notes: dbNote } });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});



app.listen(PORT, function() {
    console.log("App running on http://localhost:3500/");
});

