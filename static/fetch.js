var category_of_page = 'featured_articles'

function retrive_posts() {
    
    $.getJSON(urlContent, function(data) {
        $.each(data.query.random, function(i, item) {
            title = item.title
            pageId = item.id
            colum = 'post' + pageId
            catId = 'cat' + pageId
            contentId = 'con' + pageId
            imageId = 'img' + pageId
            if($('#' + colum).length == 0) {

                $('#feed').append('<div class="col-md-10 col-md-offset-1 feed_post" id = ' + colum + '>')
                
                if($('#' + colum + 'h2').length == 0) {
                    temp_url = "https://en.wikipedia.org/wiki/" + item.title;
                    temp_url = encodeURI(temp_url);
                    item.title = "<a href=" + temp_url + " target='_blank' >" + item.title + "</a>";
                
                    $('#' + colum).append('<h2 class="post-header text-center">' + item.title + '</h2>');
                }
                if ($('#' + imageId).length == 0) {
                    $('#' + colum).append('<div id = ' + imageId + ' class="col-sm-4 col-xs-12 pull-right"> </div><br>')
                    fetchImage(pageId)
                }
                if($('#' + contentId).length == 0) {
                    $('#' + colum).append('<div class="col-md-8" id = ' + contentId + '></div></div>'); 
                    fetchContent(pageId, title);
                    $('#feed').append('</div><br/>')
                }
            }
        })
        /*next = data.continue.gcmcontinue
        $.each(data.query.pages, function(i, item)  {
            //content = item.extract
            content = item.extract
            pageId = item.pageid
            colum = 'post' + pageId
            console.log("dhruv")
            catId = 'cat' + pageId

            if($('#' + colum).length == 0) {

                $('#feed').append('<div class="col-md-10 col-md-offset-1 feed_post" id = ' + colum + '>')
                
                if($('#' + colum + 'h2').length == 0) {
                    temp_url = "https://en.wikipedia.org/wiki/" + item.title;
                    temp_url = encodeURI(temp_url);
                    item.title = "<a href=" + temp_url + " target='_blank' >" + item.title + "</a>";
                
                    $('#' + colum).append('<h2 class="post-header text-center">' + item.title + '</h2>');
                }
                if($('#' + colum + 'p').length == 0) {
                    $('#' + colum).append('<p class="post-header">' + content + '</h2>');    
                }
                //content_of_detail = 'http://en.wikipedia.org/w/api.php?action=query&format=json&grnlimit=max&exlimit=max&prop=categories&pageids=8543872&continue=&callback=?'
                //content_of_detail = 'https://en.wikipedia.org/w/api.php?action=query&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&format=json&titles=' + item.title + '&continue=&callback=?'
                                


            }

            


        })*/

        
    })
}

function fetchContent(pageId, title) {

    urlContent = 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title + '&callback=?'
    $.getJSON(urlContent, function(data) {
        $.each(data.query.pages, function(i, item) {
            contentId = 'con' + pageId;
            //console.log(item.extract)
            $('#' + contentId).append('<p class="text-justify">' + item.extract + '</p>')
        })
    })
}

function fetchImage(pageId) {
    urlImage = 'http://en.wikipedia.org/w/api.php?action=query&pageids=' + pageId + '&prop=pageimages&format=json&pithumbsize=500&continue=&callback=?'

    $.getJSON(urlImage, function(data) {
        $.each(data.query.pages, function(i, item) {
            //console.log(item)
            content = item.thumbnail
            //only get for which there is a image
            try {
                imageId = 'img' + pageId
                $('#' + imageId).append("<img class='img-thumbnail pull-left' src = " + content.source + '> </img>')
            } catch(e) {
                $('#post' + pageId).remove();
            }
        })
    })
}


function fetchInitialPost() {
    //urlContent = 'http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:' + category_of_page + '&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue=' + next + '&continue=&callback=?'
    //urlContent = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&generator=categorymembers&gcmtitle=Category:' + category_of_page + '&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue=' + next + '&continue=&callback=?'
    urlContent = 'http://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=10&callback=?'
    retrive_posts();
    return 1
}
$(document).ready(function() {

    fetchInitialPost();
})

$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        data = 0
        //console.log($(window).scrollTop())
        //console.log($(document).height())
        //console.log($(window).height())
        //urlContent = 'http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:' + category_of_page + '&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue=' + next + '&continue=&callback=?'
        urlContent = 'http://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=10&callback=?'
        $('div#loadmoreajaxloader').show()
        retrive_posts();
    }
})