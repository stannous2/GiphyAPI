let URL = "https://api.giphy.com/v1/gifs/search?api_key=Gpjf3CoZDB0rntj3u0BcEiGQXV7NVh4H&limit=5&q=";

let topics = ['Dogs', 'Goats', 'Elephans', 'Rats', 'Horses', 'Monkeys'];
let rating = '';
let stillImage = '';
let animatedImage = '';


createButtons();
addTopic();


function addTopic (){
    $('#add-topic').on('click', function(){
        event.preventDefault();
        let newTopic = $('#topic-input').val().trim();
        if(!topics.includes(newTopic)) {
            topics.push(newTopic);
            createButtons();
            $('#topic-input').val('');
        }else
            return;
    })
  }

function createButtons() {
    $('.topic-button').empty();
    for (i = 0; i < topics.length; i++) {
        //create a button
        let a = $('<button>');

        // add attributes to the button
        a.text(topics[i]);
        a.attr('id', i);
        a.addClass('btn btn-info');

        // append button to the button div
        $('.topic-button').append(a)
    }
}

$('.topic-button').on('click', '.btn', function (e) {

    let selectedButton = $(this).html();

    //clear the images div everytime the button is clicked
    $('.imageDiv').html('');

    let queryURL = URL + selectedButton;
    console.log('queryURL = ' + queryURL);
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        //after the data from the AJAX request comes back
        .then(function (response) {

            for (i = 0; i < response.data.length; i++) {
                // getting still image URL
                stillImage = 'https://media' + i + '.giphy.com/media/' + response.data[i].id + '/200_s.gif';
                console.log('stillImage URL - ' + stillImage);

                // getting animate image URL
                animatedImage = 'https://media' + i + '.giphy.com/media/' + response.data[i].id + '/200.gif';
                console.log('animatedImage URL - ' + animatedImage);

                // getting rating for each giphy
                rating = response.data[i].rating;
                rating = 'Rating: ' + rating.toUpperCase();
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
                $('.imageDiv').prepend(image, rating);

            }
        })
});

$(".imageDiv").on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    let state = $(this).attr("data-state");

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