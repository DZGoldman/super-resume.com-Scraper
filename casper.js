var casper = require('casper').create();

  //var link ='http://www.super-resume.com'+ $('.resume').eq(12).children().attr('href');

casper.start('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer', function() {
    this.echo(this.getTitle());
    console.log('hi');

   var divtest=  casper.evaluate(function () {
    return ($('div').text());
    })
    console.log(divtest);
  //  console.log(document.querySelectorAll('[href]'))
});


casper.thenOpen('http://phantomjs.org', function() {

    this.echo(this.getCurrentUrl())
});

casper.run();
