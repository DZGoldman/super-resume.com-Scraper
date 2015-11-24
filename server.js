
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



var Scraper = require('./scraper.js')
app.get('/', function (req, res) {


phantom.create(function (ph) {
    ph.createPage(function (page) {
      //go the comp. programmer page
      page.open('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer', function (status) {
        console.log('at the programmers page?', status);

        // do stuff on that page:
        page.evaluate(function () {
          //find all links in sidebar, 20 for now!
          var links = $("a[href^='/ResumeB']")
          //create an array of string of all of all the links
          var linksArray=[];
            $("a[href^='/ResumeB']").each(function(index, linkDiv){
              $linkDiv= $(linkDiv)
              linksArray.push('http://www.super-resume.com'+$linkDiv.attr('href'))
            });
            //send it out of the eval sandbox
          return linksArray

        }, function (result) {

          console.log('all links are in!');

          var resumesArray = ['test?']

          result.forEach(function (link, index) {

            console.log(link);
            //good up until here- the links do indeed get passed in
            //attempt to open each link and scrape
            page.open(link, function (status) {
              console.log("opened resume? ", status);
              if (status !== 'success') {
               console.log('Unable to load the resume, bro!');
               ph.exit();
              }
                    //  add in (if status= fail option)
              page.evaluate(Scraper.resumeScraper,function (result){
                console.log('Heres one resume' + result);
                resumesArray.push(result)
              });
            })

          })


          res.send(resumesArray)
        })

            ph.exit

      })
   })
});


}) // end of get


// app.get('/', function (req, res) {
//   request('http://www.super-resume.com/ResumeBuilder.jtp?resume=1881584', function (error, response, html) {
//     if (!error && response.statusCode == 200) {
//          var $ = cheerio.load(html);
//         var testBox= $('.checkbox')
//          testBox.text('TEST')
//          console.log($('.jobtitle').text() );
//          html= html.replace(/\/assets/g, 'http://www.super-resume.com/assets');
//
//
//         // var link =  $('link').href
//       //    var script = $('script');
//       // //  console.log(html);
//       //   targetString = script[11].attribs.src
//       //   $('script')[11].attribs.src = 'http://www.super-resume.com'+targetString
//       //    console.log(script[11].attribs.src );
//        }
//
//       res.send(html)
//   })
// })

// ph.createPage(function (page) {
//     page.open("http://www.super-resume.com/ResumeBuilder.jtp?resume=1881584", function (status) {
//         console.log("opened resume? ", status);
//         // add in (if status= fail option)
//
//         var test = 'this is a test'
//
//         page.evaluate(Scraper.resumeScraper
//         , function (result) {
//             console.log(test);
//             console.log('Heres one resume' + result);
//             ph.exit();
//             res.send(result)
//         });
//     });
// });



// phantom.create(function (ph) {
//     ph.createPage(function (page) {
//         page.open("http://www.google.com", function (status) {
//             console.log("opened google? ", status);
//             page.evaluate(function () {
//                return document.title;
//              }, function (result) {
//                 console.log('Page a  title is ' + result);
//                 ph.exit();
//             });
//         });
//     });
// });
