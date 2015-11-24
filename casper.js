var casper = require("casper").create({

});

var numberOfLinks = 0;
var currentLink = 0;
var links = [];
var buildPage, capture, selectLink, grabContent, writeContent;
var pageXML = '<channel>';
var fs = require('fs');
var filename = 'content.xml'

casper.start("http://www.washingtonindependentreviewofbooks.com/archives/features/", function() {
    numberOfLinks = this.evaluate(function() {
        return __utils__.findAll('.the_article a').length;
    });
    this.echo(numberOfLinks + " items found");

    // cause jquery makes it easier
    casper.page.injectJs('/PATH/TO/jquery.js');
});

// Capture links
capture = function() {
    links = this.evaluate(function() {
        var link = [];
        jQuery('.the_article a').each(function() {
            link.push($(this).attr('href'));
        });
        return link;
    });
    this.then(selectLink);
};

selectLink = function() {
    if (currentLink < numberOfLinks) {
        this.then(grabContent);
    } else {
        pageXML += '</channel>'
    }
};

grabContent = function() {
    var postTitle;
    var postID;
    var postContent;

    casper.open(links[currentLink]).then(function() {

        // these will eventually be mapped into XML nodes
        postTitle   = this.fetchText('.post h2');
        postID      = this.getElementAttribute('.post', 'id');
        postContent = this.evaluate(function() {

            // items on the scraped page that needed to be removed
            jQuery('.interactive_right').remove();
            jQuery('.shareinpost').remove();
            return jQuery('.entry').html();
        });

        this.echo( 'processing item ' + currentLink + ' out of ' + numberOfLinks + ' | ' + postTitle + ' | entry #' + postID );
        pageXML += '<row><postposition><![CDATA[' + currentLink + ']]></postposition><title><![CDATA[' + postTitle + ']]></title><postContent><![CDATA[' + postContent + ']]></postContent><postId><![CDATA[' + postID + ']]></postId></row>';
    });

    this.then(buildPage);
};

buildPage = function() {
    this.echo('writing to ' + filename);
    fs.write(filename, pageXML, 'w');

    currentLink++;
    this.then(selectLink);
};

casper.then(capture);
casper.run();
