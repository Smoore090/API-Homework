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
                    for (var i=0; i < response.data.length; i++){
                        $("#gifs-go-here").prepend("<p>Rating: " + response.data[i].rating+"<p>");
                        $("#gifs-go-here").prepend("<img src='" + response.data[i].images.downsized.url + "'>");
                    }
                })
                    
                });
    /*
        //add still/animated thing here.....
    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      
      // If image is still, animate on click, else (if it's animated) make still on click.
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    */
    
    
        });