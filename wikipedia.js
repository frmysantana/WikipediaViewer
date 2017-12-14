/*Last modified on June 29, 2017*/

$(document).ready(function() {

    function formatResults(obj) {
        /*Accepts a JSON object representing the results of the searched text 
        and displays a formatted division for each result.
        
        Arguments: a JSON object returned from the wikipedia api.
        Outputs: Formatted div elements that are appended to the 
                 id="searchField" div.*/
        var pageNumbers = Object.getOwnPropertyNames(obj.query.pages);
        for (i=0; i<pageNumbers.length; i++) {
        var title = obj.query.pages[pageNumbers[i]].title;
        var url = obj.query.pages[pageNumbers[i]].fullurl;
        var firstSentence = obj.query.pages[pageNumbers[i]].extract;
        $("#searchField").append("<div class='results'><a href=" + url + " target='_blank'><h4 class='result_text'>" + title + "</h4><p class='result_text'>" + firstSentence + "</p></a></div>");
        };
    };

    function getWikis(str) {
        /*Accepts the user's search terms as a string and encodes the terms, appends them to the wikipedia api url, and performs the $.ajax JSON request.
        
        Arguments: a string representing the user's search terms.
        Outputs: Nothing. The returned JSON object is then passed onto the formatResults function.*/
        
        var query = encodeURIComponent(str);
        var request = "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&prop=info|extracts&inprop=url&exsentences=1&exlimit=max&explaintext&exintro&gsrsearch=" + query;
        
        $.ajax({
        url: request,
        success: function(data) {
            formatResults(data);
        },
        error: function(jqXHR, exception) {
            alert(exception);
            console.log(jqXHR.status, exception);
        },
        cache: false
    });
        
        $( ".results" ).remove();
        $("input").val("");
    };

    $("#search").keyup(function(event) {
        if (event.which == 13) {
        var query = $("#search").val();
        getWikis(query);
        }
    });
});
