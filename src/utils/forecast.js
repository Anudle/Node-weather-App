const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=83a33d14925819fa3eb53c256ced3705&query=${lat},${long}&units=f`
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!')
    } else if (body.error) {
      callback('unable to find location, try another search')
    } else {
      let current = body.current
      callback(null, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out`)
    }
  })
}

module.exports = forecast
