# Resume Scraper: Readme

This is a side-repo for the Resu-me, a resume analysis app created by team dog_pakk, which can be found here:
https://github.com/DZGoldman/Resu-Me

This Resume Scraper generates a seed file of data for Resu-me to use by scraping data off of here:
http://www.super-resume.com/resume-examples/  

###  Technologies Used
- CasperJS
- phantomjs
- phantom
- Javascript/Jquery
- Patience/Obstanance

###  Instructions

##### Installation
Clone this repo locally and enter the scraper_test directory.
In the console, run:
```console
npm install phantom
```
and
```console
npm install -g phantomjs casperjs
```
 **Note: this is the reccomended configuration, though it may not properly install on some operation systems. See the phantomjs and casperjs documentation for other installation options.* *

##### Running
Running
Clear your console, and  run:
```console
casperjs casper.js
```
Save the console output as 'seed.js', or whatever you please, and viola, you've got a seed file!

### How It Works

Casperjs functions as a headless browser, used to navigate to the desired locations and store the desired data. This is done in three steps:

#### Step 1: Gathering Links
First, the urls to each individual resume are gathered. This is done by traversing to all of the desired resume category pages; it's currently set up to go to all of the tech job resumes, but it can be easily altered to traverse to whatever category you'd please, including all of them. Here is one such page:
http://www.super-resume.com/ResumeBuilder.jtp?query=Computer+Programmer
As you can see, the page loads with 20 resume links available in the sidebar, and as the user scrolls down, 20 more are loaded at a time. This is simulated in the app by forcing the scrollbar down, waiting several seconds for more resumes to load, and repeating as many times as desired. It's currently set to repeat this 15 times, leaving 300 resumes links available per category. Once all 300 resumes links are loaded, their urls are gathered and stored in an array.
#### Step 2: Scraping Each Resume
The app enters each url one by one. Within the environment of each page, the desired data - job title, experiences, and other info - are scraped, cleaned up (put in clean string form, without any extra white space or problem characters) and put into a resume object.
#### Step 3: Saving the Data
This posed an odd problem; the obvious way of doing this would be to simply store each resume into a database upon scraping; however, while we were in production we didn't have direct access to our database, so we decided it'd be safer to store the data in a seed file. CasperJs, however, does not run within a node app, so other methods of outputting the data weren't available. What we decided was to create the seed file itself in the bash console window, which is to say the desired data structure (an array of resume objects, with keys of strings and arrays) was recreated by console logging the data inside the approriate syntax; the console window can then be saved as a .js file, and that file *itself* is the seed file. You say strange, I say clever, meet you halfway?

### To Do
- Refactor/DRY scrolling as a recursive function, with the option of scrolling until the bottom of the page is reached.
- DRY up catagory links, and perhaps move them into the scraper function page.
- Comment code more.
- Set up package JSON?
- Fix node modules on master branch
