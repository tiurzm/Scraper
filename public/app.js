// SCRAPE THE ARTICLES
$(document).on("click","#scrape",function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        console.log(data);
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
        url: "/saved/" + thisId,
    }).then(function(data) {
        console.log(data);
        window.location = "/";
    });
});

// DISPLAY SAVED ARTICLES
$(document).on("click", "#saved", function(){
    $.ajax({
        method: "GET",
        url: "/saved",
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
                .addClass("add-button")
                .attr("data-id", id)
                .attr("data-name", name)
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

// PUT ADD NOTE'S ID TO SAVE NOTE BUTTON
$(document).on("click", ".add-button", function(){
    // event.preventDefault();
    const thisId = $(this).attr("data-id");
    const thisName = $(this).attr("data-name");
    $("#save-note").attr("data-id", thisId);
    $("#add-note-label").text("Note for " + thisName);
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function(data){
        console.log(data)
        $("#note-list").empty();
        if (data.note) {
            console.log(data);
            let theNote = data.note.body;
            let noteId = data.note._id;
            let noteDiv = $("<div>")
                .addClass("m-2");
            let noteText = $("<p>")
                .text(theNote);
            let noteDelete = $("<button>")
                .attr("id", "delete-note")
                .attr("data-id", noteId)
                .text("x")
                .addClass("btn btn-danger float-right btn-sm");
            noteText.append(noteDelete);
            noteDiv.append(noteText);
            $("#note-list").append(noteDiv);
        }
    });
});

// ADD A NOTE TO SAVED ARTICLES
$(document).on("click", "#save-note", function(){
    const thisId = $(this).attr("data-id");
    const note = $("#note").val()
    if (!note||!thisId){
        alert("Please enter a note to save")
    } else {
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: note
            }
        }).then(function(data) {
            console.log(data);
            window.location = "/";
            $("#note").empty();
        });
    }
});

// DELETE A NOTE
$(document).on("click", "#delete-note", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
    }).then(function(data) {
        console.log(data);
        window.location = "/";
    });
});

// REMOVE AN ARTICLES FROM SAVED ARTICLES
$(document).on("click", ".remove", function(){
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/remove/" + thisId,
    }).then(function(data) {
        console.log(data);
        window.location = "/";
    });
});
