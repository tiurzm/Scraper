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

// DISPLAY SAVED ARTICLES
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
        let linkText = $("<a>")
            .attr("href", link)
            .text(link); 
        let add = $("<button>")
            .addClass("add-button")
            .attr("data-id", id)
            .attr("data-name", name)
            .addClass("btn btn-primary text-white m-2 float-right")
            .attr("data-toggle", "modal")
            .attr("data-target", "#add-note" )
            .text("Add Note");
        let remove = $("<button>")
            .attr("data-id", id)
            .addClass("remove")
            .addClass("btn btn-danger text-white m-2 float-right")
            .text("Remove ");
        title.append(remove, add)
        article.append(title, linkText);
        $("#saved-articles").append(article);
    }; 
});


// DISPLAY NOTES
$(document).on("click", ".add-button", function(){
    const thisId = $(this).attr("data-id");
    const thisName = $(this).attr("data-name");
    $("#save-note").attr("data-id", thisId);
    $("#add-note-label").text("Note for " + thisName);
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function(data){
        console.log(data);
        console.log(data.notes);
        $("#note-list").empty();
        let length = data.notes.length
        if (data.notes) {
            for(let i = 0; i < length; i++ ){
                let noteDiv = $("<div>")
                    .addClass("m-2");
                let noteText = $("<p>")
                    .text(data.notes[i].body);
                let noteDelete = $("<button>")
                    .attr("id", "delete-note")
                    .attr("data-id", data.notes[i]._id)
                    .text("x")
                    .addClass("btn btn-danger float-right btn-sm");
                noteText.append(noteDelete);
                noteDiv.append(noteText);
                $("#note-list").append(noteDiv);
            }
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
            window.location.reload();
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
        window.location.reload();
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
        window.location.reload();
    });
});
