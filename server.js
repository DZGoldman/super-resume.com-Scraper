
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
var phantom = require('phantom');


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

var Scraper = require('./scraper.js')
app.get('/', function (req, res) {


phantom.create(function (ph) {
    ph.createPage(function (page) {
      //go the comp. programmer page
      page.open('http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer', function (status) {
        console.log('at the programmers page?', status);

        // do stuff on that page:
        page.evaluate(function () {
          var resumesArray=[];
          //for ecah resume in the sidebar...
          $('.resume').each(function (index, resumeBox) {

          //...find its link
          // make an array of links 
          var link ='http://www.super-resume.com'+ resumeBox.children().attr('href');
          return link
          console.log(link);

        }, function (result) {
          console.log('heres a link', result);
          //go to that page...
          page.open(result, function (status) {
            console.log("opened resume? ", status);
            //  add in (if status= fail option)
                var test = 'this is a test'
                //scrape it
                page.evaluate(Scraper.resumeScraper
                , function (result) {
                    console.log(test);
                    console.log('Heres one resume' + result);
                    resumesArray.push(result)


                });
          })
        }) //end of forEach, start of callback hell
          res.send(resumesArray)
          ph.exit
        })


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
      })
   })
});


}) // end of get
