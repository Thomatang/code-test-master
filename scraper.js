const rp = require('request-promise')
const $ = require('cheerio')
const mepParse = require('./mepParser')

const url = 'http://www.europarl.europa.eu/meps/en/full-list/all'
rp(url)
  .then(function(html){

    const mepUrls = []
    console.log($('.ep_content', html).length)

    let mepUrl
    for (let i = 0; i < 749; i++) {
      mepUrl = $('.ep_content', html)[i].attribs.href
      if (mepUrl) {
        mepUrls.push(mepUrl)
      }
    }
    return Promise.all(
      mepUrls.map( function(url) {
        return mepParse('http://www.europarl.europa.eu' + url)
      })
    )
  })
  .then(function(meps) {
    console.log('MEPS: ', meps)
    return meps
  })
  .catch(function(err){
    console.log(err)
  })
