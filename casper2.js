var casper = require('casper').create();
casper.start('http://google.com/', function() {
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', { q: 'a picture is worth a thousand divs' }, true);
});
// 
// casper.then(function () {
//  this.click('header p a:first-child');
// })

casper.then(function() {
console.log('take a picture');
casper.capture("search.png")
});

casper.run();
