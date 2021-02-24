const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

if (process.argv[2]) {
  geoCode(process.argv[2], (error, {lat, long, loc} = {}) => {
    if (error) {
      return console.log('Error: ', error)
    }
    forecast( lat, long, (error, forecastData) => {
      if (error) {
        return console.log('Error: ', error)
      }
      console.log(loc)
      console.log('Data', forecastData)
    })
  })
} else {
  console.log('Please provide an address')
}