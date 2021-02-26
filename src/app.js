const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Defines paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Anu'
  })
}) 

app.get('/about', (req, res) => {
  res.render('about',  {
    title: 'About',
    name: 'Anu'
  })
}) 

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is help message',
    name: 'Anu'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'must provide a search term'
    })
  }
  res.send({
    products:[]
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'must provide an address'
    })
  } else {
    geoCode(req.query.address, (error, {lat, long, loc} = {}) => {
      if (error) {
        res.send({ error })
      }
      if (lat && long) {
        forecast(lat, long, (error, weatherResponse) => {
          if (!error) {
            res.send({
              forcast: weatherResponse,
              location: loc,
              address: req.query.address
            })
          }
        })
      }
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Cant find view'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Cant find view'
  })
})

app.listen(3001, () => {
  console.log('server is up in port 3001')
})