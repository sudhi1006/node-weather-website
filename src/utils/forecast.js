const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/40ea96d863f4cb21b6392e738017393a/' + latitude + ',' + longitude

    request({ url , json: true },(error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.')
        }
   
    })
}

module.exports = forecast