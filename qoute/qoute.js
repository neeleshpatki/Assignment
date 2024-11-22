
`use strict`

const API = "https://api.api-ninjas.com/v1/quotes?category=";
const key = "3nG4ESDW5FLv1KQnyC1dBA==hG4dFwaPBjW9cYdk";

var category = "";
$(document).ready(function() {
    $("button").click(function() {
        // alert("Button clicked!");

        const category = $('#categorySelect').val();

        // Check if a category was selected
        if (!category) {
            alert("Please select a category.");
            return;
        }

        // Construct the full API URL with the selected category
        const apiUrl = `${API}${category}`;


        $.ajax({
            type: "GET",
            url: API,
            headers: { 'X-Api-Key': key },
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                if (data && data.length > 0) {
                    document.querySelector('#quote').innerHTML = `<h1>${data[0].quote}</cite></h1>
                    <cite id="author">~${data[0].author}`;
                } else {
                    document.querySelector('#quote').innerHTML = `<h1>No quotes found for this category.</h1>`;
                }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    });
});
