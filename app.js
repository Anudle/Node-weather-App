const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=83a33d14925819fa3eb53c256ced3705&query=37.8267,-122.4233'

request({ url }, (error, response) => {
  const data = JSON.parse(response.body)
  console.log(data.current)
})