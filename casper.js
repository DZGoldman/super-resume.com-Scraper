var casper = require('casper').create();
var Scraper = require('./scraper.js')

//var link ='http://www.super-resume.com'+ $('.resume').eq(12).children().attr('href');

casper.start('http://www.super-resume.com/resume-examples/', function() {
  //this.echo(this.getTitle());
  console.log('hello, dave');
});


//function that gets all of the links on a given page
var getAllLinks = function() {
  //NOTE: can we scroll down before grabbing?
  var linksOnThisPage = []
  $("a[href^='/ResumeB']").each(function(index, linkDiv) {
    $linkDiv = $(linkDiv)
    linksOnThisPage.push('http://www.super-resume.com' + $linkDiv.attr('href'))
  });
  return linksOnThisPage
};

var allLinks = [];
//build allLinks array by grabbing from desired pages
casper.thenOpen('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer', function() {
  allLinks = allLinks.concat(casper.evaluate(getAllLinks))
});
casper.thenOpen('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Support+Specialist', function() {
  allLinks = allLinks.concat(casper.evaluate(getAllLinks))
});
casper.thenOpen('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Systems+Administrator', function() {
  allLinks = allLinks.concat(casper.evaluate(getAllLinks))
});
casper.thenOpen('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Systems+Analyst', function() {
  allLinks = allLinks.concat(casper.evaluate(getAllLinks))
});
casper.thenOpen('http://www.super-resume.com/ResumeBuilder.jtp?query=Database+Administrator', function() {
  allLinks = allLinks.concat(casper.evaluate(getAllLinks));
  console.log(allLinks.length);

  var resumesArray = []
  allLinks.forEach(function (link, index) {
    casper.thenOpen(link, function() {
      var resume = casper.evaluate(Scraper.resumeScraper);
      resumesArray.push(resume);
      console.log( resume.title, '.....yo thats scraped')




      if (index == allLinks.length-1) {
        console.log('you scrapped', resumesArray.length, 'resumes');






      }
    });
  })


});





casper.run();
