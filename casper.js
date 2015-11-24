var casper = require('casper').create();
var Scraper = require('./scraper.js')

  //var link ='http://www.super-resume.com'+ $('.resume').eq(12).children().attr('href');

casper.start('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer', function() {
    this.echo(this.getTitle());
    console.log('hi');


//can we scroll down before grabbing?
var allLinks = []
   allLinks = allLinks.concat( casper.evaluate(function () {
    var linksOnThisPage=[]
      $("a[href^='/ResumeB']").each(function(index, linkDiv){
        $linkDiv= $(linkDiv)
        linksOnThisPage.push('http://www.super-resume.com'+$linkDiv.attr('href'))

      });
  return linksOnThisPage
}))
  console.log(allLinks);
});


var resumesArray = []

casper.thenOpen('allLinks[0]', function() {
var resume = casper.evaluate(Scraper.resumeScraper);
resumesArray.push(resume);
console.log(resumesArray[0])
});

casper.run();
