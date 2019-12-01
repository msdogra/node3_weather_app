const express = require('express')
const geoCode = require('./utils/geocode')
const foreCast =  require('./utils/forcecast')
const path = require('path')
const hbs = require('hbs')
const app = express()

// PAth Variables
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Here',
        author: 'Mukesh Dogra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        author: 'Mukesh',
        title: 'About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helptext: 'This is helpful message',
        author: 'Mukesh'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address || req.query.address.length === 0) {
        return res.send({
            error: 'You must provide the address parameter'
        })
    }
    geoCode.geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})            
        }

        foreCast.forecast(latitude,longitude,(error,currfoecast)=>{
            if (error){
                return res.send({
                    error: 'Unable to retrieve the forecast for ' + location
                })            
            }

            res.send({
                address: req.query.address,
                location,
                weather: currfoecast
            })
        })       

    })
   
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must supply the search condition'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article',
        errortext: 'Help article not found!',
        author: 'Mukesh'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'OOPS !!',
        errortext: 'Page not Found!',
        author: 'Mukesh'
    })
})

app.listen(3000, () => {
    console.log('Web Server Started')
})