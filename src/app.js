const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Exprss config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sudipta Das'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Robot'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'Frequently Asked Question',
        name: 'Sudipta Das'
        
    })
})

// app.com
// app.com/help
// app.get('/help',(req,res) => {
//     res.send([{'name': 'Andrew'},{'name' : 'Sudipta'}])
// })

// // app.com/about
// app.get('/about',(req,res) => {
//     res.send('<h1>Title</h1>')
// })

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error,forecastData) => {
            if (error) {
                return res.send({ error })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location : location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })

})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Sudipta Das',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sudipta Das',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000 , () => {
    console.log('Server is up on port 3000.')
})