var scraperFunctions = {
  resumeScraper: function () {


  //  console.log(test);
    var resume={}
    //remove that annoying IT guy
    if ( $('.papersheet-inner').length>2)  {
      $('.papersheet-inner').last().remove()
    }


    var experienceArray =[]
    //all experinces divs
      $("[data-id^='1c']").each(function (index, expDiv) {
        $expDiv = $(expDiv)

      var jobDescription = $expDiv.children('.html-content').text();
      //experienceObject.jobdescription= jobDescription;

      experienceArray.push(jobDescription)
    })

    var jobTitle = $('.person').children('.jobtitle').text();


    var infoString = "";

    $('[data-category=text][class=block]').children('.block-inner').children('.html-content').each(function (index, infoDiv) {
      $infoDiv = $(infoDiv);
      infoString+=" "+$infoDiv.text()

    })




    resume.summary= infoString;
    resume.title = jobTitle;

    resume.experiences = experienceArray


     return resume



   }
}


module.exports = scraperFunctions
