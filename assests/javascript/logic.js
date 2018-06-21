let URL = "https://api.giphy.com/v1/gifs/search?api_key=Gpjf3CoZDB0rntj3u0BcEiGQXV7NVh4H&limit=5&q=";
//let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=dogs";
$('.button-bar').on('click', '.btn', function(e) {
    animalImage = '';
    let selectedButton = $(this).html();
    $('#images').html('');
    console.log('selected button: ' + selectedButton)
    let queryURL = URL + selectedButton;
    console.log('queryURL = ' + queryURL);
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        //after the data from the AJAX request comes back
        .then(function(response) {
            //saving the image_original_url property
            // let imageUrl = response.data.image_original_url;
            for (i = 0; i < response.data.length; i++) {
                console.log('responseObject: ' + response);
                let imageUrl = response.data[i].images.original_still.url;
                //creating an div storing an image tag
                let animalImage = $('<img>');
                //setting the dogImage src attribute to imageUrl
                animalImage.attr('src', imageUrl);
                animalImage.attr('alt', 'images');
                //prepeding the retrieved Giphy images to the images div
                $('#images').prepend(animalImage);
            }
        })
});