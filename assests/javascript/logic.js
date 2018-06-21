
let URL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit=10&tag=";


$('.button-bar').on('click', '.btn', function (e) {
    //let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=dogs";
    let selectedButton = $(this).html();
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
            // let imageUrl = response.data.image_original_url;
            let imageUrl = response.data.fixed_height_small_url;

            //creating an div storing an image tag
            let animalImage = $('<img>');

            //setting the dogImage src attribute to imageUrl
            animalImage.attr('src', imageUrl);
            animalImage.attr('alt', 'images');

            //prepeding the retrieved Giphy images to the images div
            $('#images').prepend(animalImage);
})
});

