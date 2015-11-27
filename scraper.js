var scraperFunctions = {
  resumeScraper: function () {

    // helper function: emove single and double quotes, and make lowercase
    var cleanUp=function (str) {
      var cleanStr
      cleanStr= str.toLowerCase();
      cleanStr=JSON.stringify(cleanStr);
      //remove quotes
      cleanStr = cleanStr.replace(/['"]+/g, '');
      //remove excess whitespace
      cleanStr = cleanStr.trim();
      cleanStr = cleanStr.replace(/  /g, '');
      //remove slashes
      cleanStr = cleanStr.replace(/\\/g, '');
      cleanStr=cleanStr.replace(/\//g, '')

      return cleanStr
    }

    var resume={}
    //For some reason, on the Super-resume site, every page has a full resume of this one  IT guy sitting in the background. This sees if it's there (it is) and removes it.
    if ( $('.papersheet-inner').length>2)  {
      $('.papersheet-inner').last().remove()
    }

    var experienceArray =[]
    //grab all experience divs
      $("[data-id^='1c']").each(function (index, expDiv) {
        $expDiv = $(expDiv)
        //get html of each individial experience
      var jobDescription = $expDiv.children('.html-content').text();
      jobDescription = cleanUp(jobDescription)
      experienceArray.push(jobDescription)
    })

    var jobTitle = $('.person').children('.jobtitle').text();
    var infoString = "";

    //grab all 'text blocks' (data that isn't experience or education)
    $('[data-category=text][class=block]').children('.block-inner').children('.html-content').each(function (index, infoDiv) {
      $infoDiv = $(infoDiv);

      infoString+=$infoDiv.text()+ " "
    })

    jobTitle = cleanUp(jobTitle)
    infoString = cleanUp(infoString)

    resume.summary= infoString;
    resume.title = jobTitle;
    resume.experiences = experienceArray

    // //NOTE: does that single quote thing work? these are in the wrong scope
    // console.log('title:', "'"+resume.title+ "',");
    // console.log('summary:', "'"+resume.summary+"',");
    // console.log('experiences:', "'"+resume.experiences+"',");

     return resume
   }
}

module.exports = scraperFunctions
