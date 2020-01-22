export const scrapeEULegislatorsDraft = async () => {
  const cheerio = require('cheerio')
  const mepParse = require('./mepParse')
  const mepUrls = async() => {
    const options = {
      uri: 'http://www.europarl.europa.eu/meps/en/full-list/all',
      transform: function(body) {
        return cheerio.load(body)
      }
    }
    try {
      const $ = await request(options)
      $('.ep_content', html)[i].attribs.href.each(function(i, obj) {
        const data = $(this)
          .text()
          .trim()
        mepUrls.push(data)
      })
      return mepUrls
    }
    catch (err) {
      console.log(err)
    }
  }
  const response = await Promise.all(
    mepUrls.map( function(url) {
      return mepParse('http://www.europarl.europa.eu' + url)
    })
  )
  console.log(response)
}
