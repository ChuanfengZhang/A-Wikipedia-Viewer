var arrResults = [];
var html = '';
// Create structure for the data
function Result(title, snippet) {
    this.title = title;
    this.snippet = snippet;
}

function search() {
    // Use Ajax to handle things
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
        dataType: 'jsonp',
        type: 'POST',
        headers: {
            'Api-User-Agent': 'Example/1.0'
        },
        success: function(data) {
            // First we clear the children from our class to make sure no previous results are showing.
            $('.results').empty();
            // Then we also clear the array with the results before providing new information.
            arrResults.length = 0;
            $('#search').css("width", "20%");
            $("body").css("margin-top", "15%");
            var resArr = data.query.search;
            //For each result, generate the html data.
            for (var result in resArr) {
                arrResults.push(new Result(resArr[result].title, resArr[result].snippet));
                html = '<div id="articles" class="well"><a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><h3>' + resArr[result].title + '</h3></a><p>' + resArr[result].snippet + '</p></div>';
                // Displays the elements to the page
                $('.results').append(html);
            }
            $('#search').css("width", "25%");
            $("body").css("margin-top", "3%");
        }
    });
    // This will handle when to display results based on the search bar.
    if ($('#search').val().length > 0) {
        $('.articles').css('display', 'none');
    } else if ($('#search').val().length < 1) {
        // display everything again
        $('.articles').css('display', 'block');
    }
    // This make thigns tick with each key stroke
    $('#search').unbind('keyup');
    $('#search').keyup(function() {
        search();
    });
}

$('#search').keyup(function() {
        search();
    }

);
