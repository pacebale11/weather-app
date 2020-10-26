const request = require('request')


// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=840106a7a2df5a31ad635a286b88f7ad&query=' + latitude + ',' + longitude

//     request({url: url, json:true }, (error,response) =>  {
//         if(error) {
//             callback('Unable to connect to weather service!',undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined,response.body.current.weather_descriptions+ ' It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + ' % chance of rain.')
//         }
//     })

// }

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=840106a7a2df5a31ad635a286b88f7ad&query=' + latitude + ',' + longitude

    request({url, json:true }, (error ,{ body}) =>  {
        if(error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions+ ' It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + ' % chance of rain.')
        }
    })

}


module.exports = forecast