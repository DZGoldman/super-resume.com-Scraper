# Resume Scraper: Readme

This is a side-repo for the Resu-me, a resume analysis app created by team dog_pakk, which can be found here:
https://github.com/DZGoldman/Resu-Me

This Resume Scraper generates a seed file of data for Resu-me to use by scraping data off of here:
http://www.super-resume.com/resume-examples/  

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

##### Running
Running
Clear your console, and  run:
```console
casperjs casper.js
```
Save the console output as 'seed.js', or whatever you please, and viola, you've got a seed file!

### How It Works

Three Steps:

#### Step 1: Gathering Links

#### Step 2: Scraping Each Resume

#### Step 3: Outputting the Data


### To Do
- Refactor/DRY scrolling as a recursive function, with the option of scrolling until the bottom of the page is reached.
- DRY up catagory links, and perhaps move them into the scraper function page.
- Comment code more.
- Set up package JSON?
