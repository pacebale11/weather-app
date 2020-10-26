const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')

console.log(__dirname)


// Define for path Express Config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handling bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Setup static directory to serve
app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Hadyan'
    })
})
 
// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>')
// })
//
app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helpful text"
    })
})

// app.get('/help', (req,res) => {
//     res.send([{
//         'name' : "Andrew",
//         'age' : 22
//     }, {
//         'name' : 'Mafa',
//         'age' : 22
//     }])
// })

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hadyan Mulya'

    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provie a address term'
        })
    }

    geocode(req.query.address,(error, { latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) =>  {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })

        })

    })

    // res.send({
    //     forecast : [],
    //     location: [],
    //     address: req.query.address
    // })
})




app.get('/products',(req,res)=> {

    if (!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })

    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Hadyan Mulya',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Hadyan Mulya',
        errorMessage: 'Page not found.'

    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
