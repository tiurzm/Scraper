// SCRAPE THE ARTICLES
$(document).on("click","#scrape",function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        console.log(data);
        window.location.reload();
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
        let linkText = $("<a>")
            .attr("href", link)
            .text(link); 
        let save = $("<button>")
            .attr("data-id", id)
            .addClass("save-article")
            .addClass("btn btn-primary text-white float-right")
            .text("Save Article");
        title.append(save)
        article.append(title, linkText);
        $("#articles").append(article);
    }; 
});

// SAVE AN ARTICLE
$(document).on("click", ".save-article", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/saved/" + thisId,
    }).then(function(data) {
        console.log(data);
        window.location.reload();
    });
});
