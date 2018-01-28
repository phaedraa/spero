var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var scrapeToCSV = require('./writeCSVData');

const BASE_URL = 'https://www.scholar.google.com';

request("https://www.reddit.com", function(error, response, body) {
  if (error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  var data = [];
  $('div#siteTable > div.link').each(function( index ) {
    var title = $(this).find('p.title > a.title').text().trim();
    var score = $(this).find('div.score.unvoted').text().trim();
    var user = $(this).find('a.author').text().trim();
    console.log("Title: " + title);
    console.log("Score: " + score);
    console.log("User: " + user);
    data.push([title, score, user]);
    fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
  });
  scrapeToCSV.write('test.csv', ['title', 'score', 'user'], data);
});
