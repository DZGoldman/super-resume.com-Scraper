var scraperFunctions = {
  resumeScraper: function () {
  //  console.log(test);
    var resume={}
    //remove that annoying IT guy
    if ( $('.papersheet-inner').length>2)  {
      $('.papersheet-inner').last().remove()
    }
    var jobTitle = $('.person').children('.jobtitle').text();

    //for now, puts education in as one big string. education should proably be an array of objects
    var education = $('.block[data-category=education]').text();

    var experience = $('.block[data-category=experience]').text();

      //other is multiple boxes, will probably be an each loop
    var other = $('.block[data-category=text]').text();
    resume.other = other

    resume.experience = experience;
    resume.education = education;
    resume.job_title = jobTitle;

     return resume



   }
}


module.exports = scraperFunctions
