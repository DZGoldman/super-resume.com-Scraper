
var express = require('express'),
    logger = require('morgan'),
    app = express();
    // mongoose= require('mongoose');

    //use in app
    app.use(logger('dev'));
    app.use(express.static('public'));
    var request = require('request');
    var cheerio = require('cheerio');

    //Set up sever port
    app.listen(3000, function(){
      console.log("this servers a runnin' on port 3000")
    });

var phantom = require('phantom');



var casper = require('casper').create();
var Scraper = require('./scraper.js')
app.get('/', function (req, res) {



    //var link ='http://www.super-resume.com'+ $('.resume').eq(12).children().attr('href');

  casper.start('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer', function() {
      this.echo(this.getTitle());
      console.log('hi');


  //can we scroll down before grabbing?
    var links =  casper.evaluate(function () {
       var linksArray=[]
        $("a[href^='/ResumeB']").each(function(index, linkDiv){
          $linkDiv= $(linkDiv)
          linksArray.push('http://www.super-resume.com'+$linkDiv.attr('href'))

        });
    return linksArray
     })
    console.log(links);
  });




  casper.thenOpen('links[0]', function() {

      console.log( casper.evaluate(Scraper.resumeScraper).summary.Info )
  });

  casper.run();


}) // end of get
