$(document).ready(function() {


    var topics = ["Palpatine", "Dath Maul", "Leia Organa", "Luke Skywalker", "Darth Vader", "Han Solo", "Chewbaka"];
    
    //function to create initial buttons
    function renderButtons(){
        $("#buttons-go-here").empty();
        for (var i = 0; i < topics.length; i++){
            var a = $("<button>");
            a.addClass("topics");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#buttons-go-here").append(a);
        }    
    }

    $("#add-button").submit(function(event){ 
    event.preventDefault();
        var textBox = $("#input").val().trim();
        topics.push(textBox);
        renderButtons();
        console.log(topics);
    });
    
    renderButtons();
    
    //function gets the GIFs when a button is clicked
        $(document).on("click", ".topics", function(){
            var x = $(this).data("search");
            console.log(x);
    
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=RPaK9Z4sSu8wS60vAUOVtsfL2gAI98u0&limit=10"; 
            console.log(queryURL);
    
            $.ajax({url:queryURL, method: "GET"})
                .done(function(response){
                    console.log(response);
                    var results = response.data;
                    console.log(results);
                    for (var i=0; i < results.length; i++){
                        var image =$("<img>").addClass("gif");
                        image.attr("src", results[i].images.fixed_height_still.url);
                        image.attr("data-still", results[i].images.fixed_height_still.url);
                        image.attr("data-state", "still");
                        image.attr("data-animate", results[i].images.fixed_height.url);
                        $("#gifs-go-here").prepend("<p>Rating: " + response.data[i].rating+"<p>");
                        $("#gifs-go-here").prepend(image);
                    }
                })
            });
    
            
    $(document).on("click", ".gif", function() {
      var state = $(this).attr("data-state");
      console.log(state);
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    
    
    
        });
