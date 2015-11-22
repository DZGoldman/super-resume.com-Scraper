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

    var experienceArray =[]


    $('div[data-category=experience]').each(function (index, exp) {
      var singleExperience = {}
      
    }


      //other is multiple boxes, will probably be an each loop
    var other = $('.block[data-category=text]').text();
    resume.other = other

    resume.summary={
       jobTitle: other
    }
    resume.experience = experience;
    resume.education = education;


     return resume



   }
}


module.exports = scraperFunctions
