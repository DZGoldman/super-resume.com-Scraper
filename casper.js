var casper = require('casper').create();
var Scraper = require('./scraper.js')

//This generates a seed file in the console log window. No, like, literally.

//var link ='http://www.super-resume.com'+ $('.resume').eq(12).children().attr('href');

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

  var resumesArray = []
  console.log('var resumes = [');

  allLinks.forEach(function (link, index) {
    //enter each url
    casper.thenOpen(link, function() {
      console.log('{');
      //scrape the page
      var resume = casper.evaluate(Scraper.resumeScraper);
      if (index == allLinks.length-1) {
        console.log('}');
      }else {
        console.log('},');
      }
      resumesArray.push(resume);
    });
  })
  console.log('];');
});

//this section here is just kind of silly.
/*
console.log("var mongoose = require('mongoose'); var ResumeData = require('./models/resume_data.js');")

console.log("mongoose.connect('mongodb://localhost/resu-me', function(err) {")
  console.log("if (err) {")
    console.log("console.log('connection error', err);")
  console.log("} else {")
    console.log("console.log('connection successful bro');")
  console.log("}")
console.log("});")

console.log('ResumeData.collection.insert(resumes, onInsert);')
console.log('function onInsert(err,docs) {')
  console.log('if (err) {')
    console.log("console.log('seed error, ruh roh...');")

  console.log("}else {")
    console.log("console.info('%d resumedatas were successfully stored.', docs.length);")
  console.log("}")
console.log("}")
*/

casper.run();
