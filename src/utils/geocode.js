const request = require('request')

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW51ZGxlIiwiYSI6ImNrbGloMDhtaTJkeW4yd28zcWJhMzJpZjkifQ.XOTLlSXDeFNbk0qP7cpr-g`
  request({url, json: true}, (error, {body}) => {
    console.log('in here', error)
    if (error) {
      callback('Unable to connect to location services!')
    } else if (!body.features.length) {
      callback('unable to find location, try another search')
    } else {
      callback(null, {
      'lat': body.features[0].center[1],
      'long': body.features[0].center[0],
      'loc': body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode
