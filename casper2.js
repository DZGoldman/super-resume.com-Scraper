var casper = require('casper').create();
casper.start('http://google.com/', function() {
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', { q: 'a picture is worth a thousand divs' }, true);
});



casper.then(function() {
console.log('take a picture');
casper.capture("screenshot.png")
});

casper.run();
