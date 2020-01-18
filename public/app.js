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

// GRAB THE ARTICLES
$.ajax({
    method:"GET",
    url:"/articles",
}).then(function(data) {
    const length = data.length
    for(let i = 0; i < length; i++) {
        let name = data[i].title;
        let id = data[i]._id;
        let link = data[i].link
        let article = $("<div>") 
            .addClass("article")
            .attr("data-id", id)
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