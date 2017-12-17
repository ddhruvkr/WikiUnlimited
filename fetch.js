var category_of_page = 'featured_articles'
console.log("ddsd")
var heroku_url = 'http://wikifeedia.herokuapp.com/index.php?category=' + category_of_page + '&callback=?'
console.log("ddsd")
var hex_code = []




function retrive_posts() {
	if($("#progress").length === 0) {
		$("body").append($("<div><dt/><dd/></div>").attr("id", "progress"))

	}
	$.getJSON(urlContent, function(data) {
		next = data.continue.gcmcontinue

		$.each(data.query.pages, function(i, item)  {
			content = item.extract
			pageId = item.pageid
			colum = 'post' + pageId
			catId = 'cat' + pageId

		})

		if($('#' + colum).length == 0) {
			temp_url = "https://en.wikipedia.org/wiki/" + item.title;
            temp_url = encodeURI(temp_url);
            item.title = "<a href=" + temp_url + " target='_blank' >" + item.title + "</a>";
		}

		$('#' + colum).append('<h2 class="post-header text-center">' + item.title + '</h2>');

	})
}
function loadStartIndex() {
	var heroku_url = 'http://wikifeedia.herokuapp.com/index.php?category=' + category_of_page + '&callback=?';
    $.getJSON('http://wikifeedia.herokuapp.com/index.php?category=', function(data) {

        start_page = data.category
        console.log(start_page);
        start_page_cleaned = start_page.replace('_', ' ')
        console.log(start_page);
        start_page_cleaned = start_page.toUpperCase()
        console.log(start_page);


        for (var i = 0; i < start_page_cleaned.length; i++) {
            hex_code = hex_code + start_page_cleaned.charCodeAt(i).toString(16)
        }

        start_url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=categories&titles=' + start_page + '&callback=?'

        $.getJSON(start_url, function(data) {
            $.each(data.query.pages, function(i, item) {
                start_id = item.pageid
                next = 'page|' + hex_code + '|' + start_id
                console.log(next)
                fetchInitialPost()

            })
            console.log(next)
        })
    })
}
function fetchInitialPost() {
	urlContent = 'http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:' + category_of_page + '&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue=' + next + '&continue=&callback=?'
    retrive_posts();

}
$(document).ready(function() {

	loadStartIndex();
})