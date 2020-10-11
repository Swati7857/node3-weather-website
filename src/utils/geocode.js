const request=require('request');

const geocode=(address,callback)=>
{
  const geocodeurl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1Ijoic3dhdGk3ODU3IiwiYSI6ImNrZnMxczc2ajA4bXAyc3N2eG1wMm15aHIifQ.cwxYnb6mgei2xDSGiWnLqQ&limit=1";

  request({ url: geocodeurl, json: true }, (error, {body}={}) => {
    if (error) {
        callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined)
    } else {
        callback(undefined, {
            lattitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
        })
    }
})
}

module.exports = geocode