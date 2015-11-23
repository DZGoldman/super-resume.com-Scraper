var scraperFunctions = {
  resumeScraper: function () {


  //  console.log(test);
    var resume={}
    //remove that annoying IT guy
    if ( $('.papersheet-inner').length>2)  {
      $('.papersheet-inner').last().remove()
    }


    var educationArray = [];
    //for now, puts education in as one big string. education should proably be an array of objects
    $("[data-id^='2c']").each(function (index, eduDiv) {
      $eduDiv = $(eduDiv)
      var educationObject = {};

      var degree = $eduDiv.children('.sub-title').text();
      educationObject.degree = degree;

      var school =  $eduDiv.children('.sub-where').text();
      educationObject.school = school

      educationArray.push(educationObject)

    })

    var experienceArray =[]
    //all experinces divs
      $("[data-id^='1c']").each(function (index, expDiv) {
        $expDiv = $(expDiv)
      var experienceObject = {}
      var jobTitle = $expDiv.children('.sub-title').text()
      experienceObject.jobtitle= jobTitle;

      var jobDescription = $expDiv.children('.html-content').text();
      experienceObject.jobdescription= jobDescription;

      experienceArray.push(experienceObject)
    })

    var jobTitle = $('.person').children('.jobtitle').text();
      //other is multiple boxes, will probably be an each loop
    var infoArray = [];

    $('[data-category=text][class=block]').children('.block-inner').children('.html-content').each(function (index, infoDiv) {
      $infoDiv = $(infoDiv);
      infoArray.push($infoDiv.text())

    })

    var summaryObject= {};
    summaryObject.jobtitle = jobTitle;
    summaryObject.Info = infoArray


    resume.summary=summaryObject;

    resume.experiences = experienceArray
    resume.education = educationArray;


     return resume



   }
}


module.exports = scraperFunctions
