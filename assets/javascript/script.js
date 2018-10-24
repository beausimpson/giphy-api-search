
// variable to store array of strings
var topics = ["the office", "parks and recreation", "bob's burgers", "archer"];

function displayGifTitles() {
    // Grabbing and storing the data-tvShow property value from the button
    var tvShow = $(this).attr("data-name");
    // giphy api key
    var apikey = "yreg65qPqxwgz6pXgTifj2sJahDcnU34";
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${tvShow}&api_key=${apikey}&limit=10&rating=PG-13`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        // stores the response data
        var results = response.data
        for (var i = 0; i < results.length; i++) {

            // Creating a div to hold the gif
            var gifDiv = $("<div>");
            // add class to div
            gifDiv.addClass("gifDiv");


            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var gifImage = $("<img>");
            // adding class to img 
            gifImage.addClass("gif");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.original_still.url);
            // setting the data-still / data-animate attributes for start & stopping of gif
            gifImage.attr("data-still", results[i].images.original_still.url);
            gifImage.attr("data-animate", results[i].images.original.url);
            // setting the data state
            gifImage.attr("data-state", "still");
            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);

            // Prependng the gifDiv to the HTML page in the "#gif-div" div
            $("#gif-div").prepend(gifDiv);


        };

    });

};

// function to render buttons to top of page
function renderButtons() {
    // clears button dib so buttoms can be added fresh each time
    $("#button-div").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        var gifButton = $("<button>");
        // Adding a class of gif-btn to our button
        gifButton.addClass("gifs-btn");
        // Adding a data-attribute
        gifButton.attr("data-name", topics[i]);
        // Providing the initial button text
        gifButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#button-div").append(gifButton);
    }

}

// This function handles events where a movie button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#gif-input").val("");
});


// $(".gif").on("click", function () {
//     console.log("test");
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

$(document).on("click", ".gifs-btn", displayGifTitles);

// Calling the renderButtons function to display the intial buttons
renderButtons();