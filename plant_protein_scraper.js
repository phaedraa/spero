var request = require('request');
var cheerio = require('cheerio');
var scrapeToCSV = require('./writeCSVData');

const SCHOLAR_BASE_URL = 'http://scholar.google.com/';

var makeQueryStringFromTerms = (terms) => {
  if (!terms || terms.length < 1) {
    console.log("Error: missing search terms");
    return;
  }

  var query = '';
  const end = terms.length - 1;
  terms.forEach((term, idx) => {
    query += term;
    if (idx != end) {
      query += '+';
    }
  });
  return query;
};

var getURLFromSearchTerms = (terms) => {
  return `${SCHOLAR_BASE_URL}scholar?hl=en&as_sdt=0%2C5&q=${makeQueryStringFromTerms(terms)}`;
};

var searchAndScrape = (terms, foodCateogry, dataCategory) => {
  request(getURLFromSearchTerms(terms), (error, response, body) => {
    if (error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
    var data = [];
    //console.log('children', $('div#gs_res_ccl_mid').children().length);
    $('gs_res_ccl_mid').filter(() => {
      //console.log('this child', child, index);
      //var title = $(this).find('div.div.h3').text().trim();
      //console.log('title', title);
      var data = $(this);
      data.children().each(child => {
        console.log('here');
      });
      //var score = $(this).find('div.score.unvoted').text().trim();
      //var user = $(this).find('a.author').text().trim();
      data.push([title, score, user]);
    });
    scrapeToCSV.write('test.csv', ['title', 'score', 'user'], data);
  });
};

searchAndScrape(['bean', 'protein', 'properties'], 'legumes', 'protein');
