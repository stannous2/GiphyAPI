let URL = "https://api.giphy.com/v1/gifs/search?api_key=Gpjf3CoZDB0rntj3u0BcEiGQXV7NVh4H&limit=5&q=";

let topics = ['Dogs', 'Goats', 'Elephans', 'Rats', 'Horses', 'Monkeys'];
let rating = '';
let stillImage = '';
let animatedImage = '';

createButtons();

function createButtons() {
    for (i = 0; i < topics.length; i++) {
        //create a div to hold all buttons
        let buttonDiv = $('<div>');
        buttonDiv.addClass('button-bar');
        console.log('topic name - ' + topics[i])

        //create a button
        let topicButton = $('<button>');

        // add attributes to the button
        topicButton.text('value', topics[i]);
        topicButton.attr('id', i);
        topicButton.addClass('btn btn-primary topicButtons');

        console.log('class - ' + topicButton.attr('class'))

        // append button to the button div
        buttonDiv.append(topicButton)

    }


}


$('.button-bar').on('click', '.btn', function (e) {

    let selectedButton = $(this).html();

    //clear the images div everytime the button is clicked
    $('.images').html('');

    console.log('selected button: ' + selectedButton)

    let queryURL = URL + selectedButton;
    console.log('queryURL = ' + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        //after the data from the AJAX request comes back
        .then(function (response) {
            //saving the image_original_url property

            for (i = 0; i < response.data.length; i++) {
                // uniKey.push(response.data[i].id);
                // console.log('key - ' + uniKey);


                // getting still image URL
                stillImage = 'https://media' + i + '.giphy.com/media/' + response.data[i].id + '/200_s.gif';
                console.log('stillImage URL - ' + stillImage);

                // getting animate image URL
                animatedImage = 'https://media' + i + '.giphy.com/media/' + response.data[i].id + '/200.gif';
                console.log('animatedImage URL - ' + animatedImage);

                // getting rating for each giphy
                rating = response.data[i].rating;
                console.log('rating - ' + rating);

                //creating an div storing an image tag
                let image = $('<img>');

                //setting the dogImage src attribute to Image
                image.addClass('gif');
                image.attr('src', stillImage);
                image.attr('data-still', stillImage);
                image.attr('data-animate', animatedImage);
                image.attr('data-state', 'still');

                //prepeding the retrieved Giphy images to the images div
                $('.images').prepend(image);
            }
        })
});


$(".images").on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    let state = $(this).attr("data-state");
    console.log('image state - ' + state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        console.log('imgSource - ' + $(this).attr('src'));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});