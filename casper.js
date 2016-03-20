var casper = require('casper').create();
var Scraper = require('./scraper.js');
var fs = require('fs')

//This generates a seed file in the console log window. No, like, literally.

casper.start('http://www.super-resume.com/resume-examples/', function() {
  //this.echo(this.getTitle());
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

//scroller
var scrollDown = function() {
   console.log('scrolling down');
  $('#search-left-inner').scrollTop(1000000);
};

var loadAllLinksOnPage = function(category) {
  var prefix = 'http://www.super-resume.com/ResumeBuilder.jtp?query='
  casper.thenOpen(prefix+category)
    .thenEvaluate(scrollDown)

    .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    // .wait(2500, function() {}).thenEvaluate(scrollDown)
    .wait(2500, function() {
      var links = this.evaluate(getAllLinks);
      allLinks = allLinks.concat(links)
    })
}

var categoriesArray =[ 'Computer+Support+Specialist','Computer+Systems+Administrator'
//
// ,'Computer+Systems+Analyst','Web+Developer','Game+Developer','Mobile+Application+Developer','IT+Project+Manager','Information+Security+Analyst','Mechanical+Engineer','QA+Software+Tester','Software+Developer','Computer+Programmer','Database+Administrator'
]

categoriesArray.forEach(function (category) {
  console.log('loading a new category');
loadAllLinksOnPage(category)
})

casper.thenOpen('http://www.super-resume.com/ResumeBuilder.jtp?query=Database+Administrator', function() {

  var resumesArray = []
  console.log('i found ', allLinks.length, 'links');

  allLinks.forEach(function(link, index) {
    //enter each url

    casper.thenOpen(link, function() {
      var resume = casper.evaluate(Scraper.resumeScraper);

      resumesArray.push(resume);

      if (index==allLinks.length-1) {
        console.log('got all the resumes');
        // save resumesArray

        fs.write('resumestest.js', 'module.exports=', 'w')
        fs.write('resumestest.js', JSON.stringify(resumesArray), 'a')

      }

    });
  })


});



casper.run();
