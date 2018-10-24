
// variable to store array of strings
var topics = ["the office", "parks and recreation", "bob's burgers", "archer"];

function displayGifs() {

    // clears the gif div
    $("#gif-div").empty();
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
            gifDiv.addClass("col-md-3 gifDiv");

            // Creating a paragraph tag with the result item's title
            var title = $("<p>").text(results[i].title);
            // adds class to title p tag
            title.addClass("title");
            // Creating a paragraph tag with the result item's rating
            var rating = $("<p>").text("Rating: " + results[i].rating);
            // adds class to rating p tag
            rating.addClass("rating");
            // creates and stores an image tag
            var gifImage = $("<img>");
            // adds class to img 
            gifImage.addClass("img-fluid gif");
            // creates and stores download p tag
            var downloadGif = $("<p>");
            // adds class to the download p tag
            downloadGif.addClass("download")
            // adds the download link
            var downloadLink = $("<a>").html("<i class='fas fa-download'></i> Download");
            // adds src to downlaod anchor tag
            downloadLink.attr("href", results[i].images.original.url)
            // adds the download link to download p tag
            downloadLink.attr("download", results[i].title)
            // makes link open in new tab
            downloadLink.attr("target", "_blank")
            // appends the download link to download gif p tag
            downloadGif.append(downloadLink);
            // sets the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_width_still.url);
            // sets the data-still / data-animate attributes for start & stopping of gif
            gifImage.attr("data-still", results[i].images.fixed_width_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_width.url);
            // sets the data state
            gifImage.attr("data-state", "still");
            // appends the paragraphs and image tag to the gifDiv
            gifDiv.append(title, rating, gifImage, downloadGif);

            // prepends the gifDiv to the HTML page in the "#gif-div" div
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

// This function handles events where a gif button is clicked
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

// Adds a click event listener to all elements with a class of "gif" to start and stop the gifs
$(document).on("click", ".gif", function () {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// adds a click event listener to all elements with an id of "download" to download the gifs
// $(document).on("click", ".download", function (event) {
//     event.preventDefault();
//     window.location.href = 'uploads/file.doc';
// })

// Adds a click event listener to all elements with a class of "gifs-btn" to display the differant gifs for the selected button
$(document).on("click", ".gifs-btn", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();