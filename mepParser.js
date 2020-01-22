const $ = require('cheerio');
const puppeteer = require('puppeteer');

const mepParse = function(url) {
  return puppeteer
    .launch()
    .then(function(browser){
      return browser.newPage()
    })
    .then(async function(page){
      await page.goto(url)
      return page.content()
    })
    .then(function(html) {
      return {
        name: $('span.erpl-member-card-full-member-name', html).text(),
        partyGroup: $('#erpl-political-group-name > span', html).text(),
        country: $('#erpl-member-country-name', html).text(),
        url: url,
        image: 'http://www.europarl.europa.eu' + $('.ddl-picture', html).attr('src')
      }
    })
    .catch(function(err){
      console.log(err)
    })
}

module.exports = mepParse
