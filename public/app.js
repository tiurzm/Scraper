// SCRAPE THE ARTICLES
$(document).on("click","#scrape",function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        console.log(data)
        window.location = "/";
    });
});

// GRAB THE ALL ARTICLES
$.ajax({
    method:"GET",
    url:"/articles",
}).then(function(data) {
    const length = data.length
    $("#articles").empty();
    $("#saved-articles").empty();
    for(let i = 0; i < length; i++) {
        let name = data[i].title;
        let id = data[i]._id;
        let link = data[i].link
        let article = $("<div>") 
            .addClass("article")
            .addClass("my-5"); 
        let title = $("<p>")
            .text(name);
        let linkText = $("<p>")
            .text(link); 
        let save = $("<button>")
            .attr("data-id", id)
            .addClass("save-article")
            .addClass("btn")
            .addClass("btn-primary")
            .addClass("text-white")
            .text("Save Article");
        article.append(title, linkText, save);
        $("#articles").append(article);
    }; 
});

// SAVE AN ARTICLE
$(document).on("click", ".save-article", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId,
    }).then(function(data) {
        console.log(data)
        window.location = "/";
    });
});

// DISPLAY SAVED ARTICLES
$(document).on("click", "#saved", function(){
    $.ajax({
        method: "GET",
        url: "/articles/save",
    }).then(function(data) {
        const length = data.length
        $("#articles").empty();
        $("#saved-articles").empty();
        for(let i = 0; i < length; i++) {
            let name = data[i].title;
            let id = data[i]._id;
            let link = data[i].link
            let article = $("<div>") 
                .addClass("article")
                .addClass("my-5"); 
            let title = $("<p>")
                .text(name);
            let linkText = $("<p>")
                .text(link); 
            let add = $("<button>")
                .attr("data-id", id)
                .addClass("add-note")
                .addClass("btn")
                .addClass("btn-primary")
                .addClass("text-white")
                .addClass("mr-1")
                .attr("data-toggle", "modal")
                .attr("data-target", "#add-note" )
                .text("Add Note");
            let remove = $("<button>")
                .attr("data-id", id)
                .addClass("remove")
                .addClass("btn")
                .addClass("btn-danger")
                .addClass("text-white")
                .text("Remove ");
            article.append(title, linkText, add, remove);
            $("#saved-articles").append(article);
        }; 
    });
});

// ADD A NOTE TO SAVED ARTICLES
$(document).on("click", ".add-note", function(){
    const thisId = $(this).attr("data-id");
    // alert("test add"); 
});

// REMOVE AN ARTICLES FROM SAVED ARTICLES
$(document).on("click", ".remove", function(){
    const thisId = $(this).attr("data-id");
    // alert("test remove"); 
});
